import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import PremiumCard from '../../components/PremiumCard';
import Text from '../../components/Text';
import { colors } from '../../utils/theme';
import { ScrollView, TouchableOpacity, View, Linking, Platform } from 'react-native';
import Button from '../../components/Button';
import { connect } from 'react-redux';
import { getPremiumUserProfile } from '../../redux/actions/premiumAccountActions/getPremUserProfile';
import { fireAuth } from '../../firebase/firebase';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const PremiumProfile = ({
  getUserProfile,
  navigation,
  route,
  user,
  posts,
  pets,
}) => {
  const { uid } = route.params;
  
  useEffect(() => {
    getUserProfile(uid)
  }, [])

  const colorSpec = () => {
    if(user.specialty === 'breeder') {
      return colors.primary
    }
    if(user.specialty === 'trainer') {
      return '#9c27b0'
    }
    if(user.specialty === 'veterinarian') {
      return '#26a69a'
    } else {
      return colors.primary
    }
  }

  return (
    <Container>
      <Header>
        <TouchableOpacity style={{ alignItems: "center", flexDirection: 'row' }} onPress={() => navigation.pop()}>
          <>
          <Ionicons name='ios-arrow-back' color={colors.primary} size={24} />
          <Text 
            color='primary' 
            fontSize={18} 
            fontWeight='bold'
            position='relative'
            left={10}>
              Back
          </Text>
          </>
        </TouchableOpacity>
      </Header>

      <ScrollView style={{ marginBottom: 22 }}>
        <Content>
            <Title>
              <Icon source={{ uri: user.profileImage }} />
              <Text color='darkText' fontWeight='semi-bold' fontSize={26}>{user.displayName}</Text>
              <Capsule style={{ backgroundColor: colorSpec(), alignItems: 'center', marginTop: 10 }}>
                <Text color='white' fontWeight='semi-bold'>{user.specialty}</Text>
              </Capsule>
            </Title>

            <Specialties>
              <SpecialtiesInfo>
                <Text color='lightGray'>~ Doberman</Text>
                  <Text color='lightGray'>~ {user.details?.city}</Text>
                  { user.specialty === 'breeder' &&
                    <Capsule style={{ backgroundColor: colors.alert }}>
                      <Text fontSize={10} fontWeight='bold' color='white'>PENDING</Text>
                      <Text color='white'>Verification</Text>
                    </Capsule>
                  }
              </SpecialtiesInfo>
              { fireAuth.currentUser.uid !== user.uid &&
                <ButtonGroup>
                  <Button color='white' fill='primary' expand='none' width={200} onPress={() => navigation.navigate('chatroom', {
                    userProfileId: uid
                  })} >Send Message</Button>
                </ButtonGroup>
              }
              { fireAuth.currentUser.uid === user.uid && user?.details !== undefined &&
                <ButtonGroup>
                  <Button width={200} fontWeight='semi-bold' fill='danger' onPress={() => navigation.push('addPremUserDetails', { 
                      specialty: user.specialty,
                      farmName: user.details.farmName,
                      registeredBreeder: user.details.registeredBreeder,
                      yearsInBusiness: user.details.yearsInBusiness,
                      breederId: user.details.breederId,
                      address:user.details.address,
                      city: user.details.city,
                      state: user.details.state,
                      zipcode: user.details.zipcode,


                      businessName: user.details.businessName,
                      specialized: user.details.specialized,
                      trainingStyles: user.details.trainingStyles,

                      ears: user?.details.ears,
                      tail: user?.details.tail,
                      shots: user?.details.shots,


                      editMode: true,
                    }
                  )}>Edit business details</Button>
                </ButtonGroup>
              }
              <>
              {
                user.specialty === 'breeder' &&
                <>
                { user.details ? 
                  <Bio>
                    <BioTitle>
                      <Text fontSize={18} fontWeight='semi-bold' color='darkText'>Details</Text>
                    </BioTitle>

                    <Text color='lightGray'>Farm Name: <Text color='darkText'>{user.details.farmName}</Text></Text>
                    <Text color='lightGray'>Registered Breeder: <Text color='darkText'>{user.details.registeredBreeder ? 'No' : 'Yes'}</Text></Text>
                    { user.details.breederId &&
                      <Text color='lightGray'>Breeder ID: <Text color='darkText'>{user.details.breederId}</Text></Text>
                    }
                    <Text color='lightGray'>Year(s) in business: <Text color='darkText'>{user.details.yearsInBusiness}</Text></Text>
                    <Text color='lightGray'>Location:</Text>
                    <Text color='alert'fontWeight='semi-bold' onPress={() => {
                      
                      const {
                        address,
                        lat,
                        lng,
                      } = user.details;

                      console.log(address,
                        lat,
                        lng,)


                      const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
                      const latLng = `${lat},${lng}`;
                      const label = `${address}`;
                      const url = Platform.select({
                        ios: `${scheme}${label}@${latLng}`,
                        android: `${scheme}${latLng}(${label})`
                      });

                      Linking.openURL(url); 


                    }}>{user.details.address} - {user.details.city}, {user.details.state}</Text>
                  </Bio>
                  :
                  <View style={{ alignItems: 'center', marginBottom: 16 }}>
                    <>
                    { fireAuth.currentUser.uid === uid &&
                      <Button width={200} marginTop={20} fontWeight='semi-bold' fill='danger' onPress={() => navigation.push('addPremUserDetails', { specialty: user.specialty })}>Add business details</Button>
                    }
                    </>
                  </View>
                }
                </>
              }

              {
                user.specialty === 'trainer' &&
                <>
                { user.details ? 
                  <Bio>
                    <BioTitle>
                      <Text fontSize={18} fontWeight='semi-bold' color='darkText'>Details</Text>
                    </BioTitle>

                    <Text color='lightGray'>Business Name: <Text color='darkText'>{user.details.businessName}</Text></Text>
                    <Text color='lightGray'>Specialized with Dobermanns: <Text color='darkText'>{user.details.specialized ? 'Yes' : 'No'}</Text></Text>
                    <Text color='lightGray'>Training Styles: <Text color='darkText'>{user.details.trainingStyles}</Text></Text>
                    <Text color='lightGray'>Year(s) in business: <Text color='darkText'>{user.details.yearsInBusiness}</Text></Text>
                    <Text color='lightGray'>Location: <Text color='alert'fontWeight='semi-bold' onPress={() => {
                      
                      const {
                        address,
                        lat,
                        lng,
                      } = user.details;

                      const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
                      const latLng = `${lat},${lng}`;
                      const label = `${address}`;
                      const url = Platform.select({
                        ios: `${scheme}${label}@${latLng}`,
                        android: `${scheme}${latLng}(${label})`
                      });

                      Linking.openURL(url); 


                    }}>{user.details.address}, {user.details?.city}, {user.details.state}</Text></Text>
                  </Bio>
                  :
                  <View style={{ alignItems: 'center', marginBottom: 16 }}>
                    <>
                    { fireAuth.currentUser.uid === uid &&
                      <Button width={200} fontWeight='semi-bold' fill='danger' onPress={() => navigation.push('addPremUserDetails', { specialty: user.specialty })}>Add business details</Button>
                    }
                    </>
                  </View>
                }
                </>
              }

              {
                user.specialty === 'veterinarian' &&
                <>
                { user.details ? 
                  <Bio>
                    <BioTitle>
                      <Text fontSize={18} fontWeight='semi-bold' color='darkText'>Details</Text>
                    </BioTitle>

                    <Text color='lightGray'>Vet Business Name: <Text color='darkText'>{user.details.businessName}</Text></Text>
                    <Text color='lightGray'>Year(s) in business: <Text color='darkText'>{user.details.yearsInBusiness}</Text></Text>
                    <Text color='lightGray'>Shots available: <Text color='darkText'>{user?.details.shots}</Text></Text>
                    <Text color='lightGray'>Ear crop service: <Text color='darkText'>{user?.details.ears ? 'Yes' : 'No'}</Text></Text>
                    <Text color='lightGray'>Tail crop service: <Text color='darkText'>{user?.details.tail ? 'Yes' : 'No'}</Text></Text>
                    <Text color='lightGray'>Location: <Text color='alert'fontWeight='semi-bold' onPress={() => {
                      
                      const {
                        address,
                        lat,
                        lng,
                      } = user.details;

                      const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
                      const latLng = `${lat},${lng}`;
                      const label = `${address}`;
                      const url = Platform.select({
                        ios: `${scheme}${label}@${latLng}`,
                        android: `${scheme}${latLng}(${label})`
                      });

                      Linking.openURL(url); 


                    }}>{user.details.address} - {user?.details.city}, {user?.details.state}, {user?.details.zipcode}</Text></Text>
                  </Bio>
                  :
                  <View style={{ alignItems: 'center', marginBottom: 16 }}>
                    <>
                    { fireAuth.currentUser.uid === uid &&
                      <Button width={200} fontWeight='semi-bold' fill='danger' onPress={() => navigation.push('addPremUserDetails', { specialty: user.specialty })}>Add business details</Button>
                    }
                    </>
                  </View>
                }
                </>
              }
              </>

            </Specialties>
          
            { user.specialty === 'breeder' &&
              <DogContent>
                <Text color='darkText' fontWeight='semi-bold' fontSize={18} position='relative' left={10}>Dobermans for Breeding</Text>
                <ImageAndMap> 
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    { pets !== undefined && 
                      pets.map((pet, i) => {
                        console.log(pet)
                        return (
                          
                          <DogImageContent>
                            <TouchableWithoutFeedback style={{width: 210 }} onPress={() => navigation.push('petDetails', {
                            dog: pet
                          })}>
                            <Image source={{ uri: pet?.image[0] }} />
                            </TouchableWithoutFeedback>
                          </DogImageContent>
                        )
                      })
                    }
                    { fireAuth.currentUser.uid == user.uid &&
                      <AddPetIcon onPress={() => navigation.push('premium-newDogBreed')}>
                        <Ionicons color={colors.white} name='ios-add-circle' size={42} />
                        <Text color='white'>Add new pet</Text>
                      </AddPetIcon>
                    }
                  </ScrollView>
                </ImageAndMap>
              </DogContent>
            } 

            <MapContent>
              <Text color='darkText' fontWeight='semi-bold' fontSize={18} position='relative'>Location</Text>
              <Map>
                <MapView 
                  region={{
                    latitude: user.details?.lat,
                    longitude: user.details?.lng,
                    latitudeDelta: 0.0001,
                    longitudeDelta: 0.03,
                  }}
                  style={{ flex: 1 }} 
                >
                  <Marker
                    coordinate={{
                      latitude: user.details?.lat,
                      longitude: user.details?.lng,
                    }}
                  />
                </MapView>
              </Map>
            </MapContent>

            <TextBox>
              <Text fontSize={18} fontWeight='semi-bold' position='relative' left={10}>Posts</Text>
            </TextBox>
            { posts &&
            posts.map((post, index) => {
              
              const specialtyColor = () => {
                if(post.postOwner.specialty === 'breeder') {
                  return colors.primary
                }
                if(post.postOwner.specialty === 'trainer') {
                  return '#9c27b0'
                }
                if(post.postOwner.specialty === 'veterinarian') {
                  return '#26a69a'
                } else {
                  return colors.primary
                }
              }

              return (
                <PremiumCard
                  key={index}
                  navigationToProfile={() => navigation.push('premium-profile', { uid: post.postOwner.uid })}
                  profileImage={post.postOwner?.profileImage}
                  desc={post.desc}
                  specialty={post.postOwner.specialty}
                  verified={post.postOwner.verified}
                  city={post.postOwner.location.city}
                  state={post.postOwner.location.state}
                  postImages={post.postImages}
                  displayName={post.displayName}
                  dogType={post.dogType}
                  capsuleColor={specialtyColor()}
                />
              )
            })
          }
        </Content>
      </ScrollView>

    </Container>
  )
};

const mapStateToProps = (state) => ({
  user: state.premiumProfile.user,
  posts: state.premiumProfile.posts,
  pets: state.premiumProfile.pets,
});

const mapDispatchToProps = (dispatch) => ({
  getUserProfile: (uid) => dispatch(getPremiumUserProfile(uid))
});

export default connect(mapStateToProps, mapDispatchToProps)(PremiumProfile);

const Container = styled.View`
  flex: 1;
  background: #fff;
`;

const Header = styled.View`
  border-bottom-color: #f2f2f2;
  border-bottom-width: 1px;
  flex-direction: row;
  margin-top: 10px;
  padding-left: 10px;
  padding-top: 50px;
  padding-bottom: 10px;
`;

const Capsule = styled.View`
  border-radius: 20px;
  padding: 5px 12px;
  align-items: center;
`;

const Content = styled.View`
`;

const Specialties = styled.View`
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom-color: #f2f2f2;
  border-bottom-width: 1px;
`;

const Title = styled.View`
  align-items: center;
  margin-top: 10px;
`;

const Icon = styled.Image`
  border-radius: 25px;
  height: 50px;
  width: 50px;
  margin-bottom: 5px;
`;

const ImageAndMap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 171px;
  margin: 10px 0;
  padding: 10px 0;
  overflow: hidden;
`;

const DogImageContent = styled.View`
  background: #fff;
  border-radius: 16px;
  flex-direction: row;
  margin-left: 10px;
  overflow: hidden;
  width: 210px;
`;

const MapContent = styled.View`
  height: 210px;
  margin: 0 10px;
  margin-bottom: 16px;
  margin-top: 16px;
  overflow: hidden;
`;

const Map = styled.View`
  background: #e0e0e0;
  border-radius: 16px;
  height: 171px;
  overflow: hidden;
  width: 100%;
  margin-top: 6px;
  position: relative;
  top: 10px;
`;

const DogContent = styled.View`
  box-shadow: 0 4px 16px rgba(0,0,0, 0.1);
  margin-top: 20px;
`;

const Image = styled.Image`
  height: 100%;
  width: 100%;
`;

const ButtonGroup = styled.View`
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const SpecialtiesInfo = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
`;

const AddPetIcon = styled.TouchableOpacity`
  align-items: center;
  background-color: ${colors.primary};
  border-radius: 16px;
  justify-content: center;
  margin: 0 10px;
  width: 200px;
`;

const TextBox = styled.View`
  margin-top: 4px;
  margin-bottom: 20px;
`;

const Bio = styled.View`
  background-color: #fff;
  height: 160px;
  padding: 0 10px;
  justify-content: space-evenly;
  margin-bottom: 6px;
  margin-top: 8px;
`;

const BioTitle = styled.View`
`;