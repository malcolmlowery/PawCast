import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import PremiumCard from '../../components/PremiumCard';
import Text from '../../components/Text';
import { colors } from '../../utils/theme';
import { ScrollView, TouchableOpacity } from 'react-native';
import Button from '../../components/Button';
import { connect } from 'react-redux';

const PremiumProfile = ({
  navigation,
  user
}) => {

  useEffect(() => {
    console.log('dsa', user)
  }, [])
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
              <Icon source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/pawcast-app-6daf2.appspot.com/o/image-dd3326-dc-f1fc-3bf8-e32c061252e1.jpg?alt=media&token=91b5d081-057b-4298-a7de-04a3457ebe84' }} />
              <Text color='darkText' fontWeight='semi-bold' fontSize={26}>Malcolm Lowery</Text>
              <Capsule style={{ backgroundColor: colors.primary, width: 100, alignItems: 'center', marginTop: 10 }}>
                <Text color='white' fontWeight='semi-bold'>Breeder</Text>
              </Capsule>
            </Title>

            <Specialties>
              <SpecialtiesInfo>
                <Text color='lightGray'>~ Doberman</Text>
                <Text color='lightGray'>~ Miami, FL</Text>
                <Capsule style={{ backgroundColor: colors.alert }}>
                  <Text color='white'>Verified</Text>
                </Capsule>
              </SpecialtiesInfo>
              <ButtonGroup>
                <Button color='white' fill='primary' expand='none' width={200}>Send Message</Button>
              </ButtonGroup>
            </Specialties>
          
            <DogContent>
              <Text color='darkText' fontWeight='semi-bold' fontSize={18} position='relative' left={10}>Dobermans for Breeding</Text>
              <ImageAndMap> 
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  <DogImageContent>
                    <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/pawcast-app-6daf2.appspot.com/o/image-ccdb5e6-3e8d-7cf2-77bb-bf1141f10575.jpg?alt=media&token=38d1b34d-d19a-4598-ba2a-82105a023b5e' }} />
                  </DogImageContent>
                  <DogImageContent>
                    <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/pawcast-app-6daf2.appspot.com/o/image-dab82b-4cea-7d4-8375-1a8033edc26.jpg?alt=media&token=7d6ff0e9-bd78-444f-b62a-7ea5d8b082c2' }} />
                  </DogImageContent>
                  <AddPetIcon>
                    <Ionicons color={colors.darkText} name='ios-add-circle' size={42} />
                    <Text>Add new pet</Text>
                  </AddPetIcon>
                </ScrollView>
              </ImageAndMap>
            </DogContent>

            <MapContent>
              <Text color='darkText' fontWeight='semi-bold' fontSize={18} position='relative'>Location</Text>
              <Map>
                <MapView style={{ flex: 1 }} />
              </Map>
            </MapContent>

            <Text fontSize={18} fontWeight='semi-bold' position='relative' left={10}>Posts</Text>

            <PremiumCard />
        </Content>
      </ScrollView>

    </Container>
  )
};

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, null)(PremiumProfile);

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
  margin-left: 10px;
  padding: 5px 12px;
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
  overflow: hidden;
`;

const Map = styled.View`
  background: #e0e0e0;
  border-radius: 16px;
  height: 171px;
  overflow: hidden;
  width: 100%;
  margin-top: 10px;
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
  margin-bottom: 15px;
`;

const SpecialtiesInfo = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
`;

const AddPetIcon = styled.View`
  align-items: center;
  background-color: #f2f2f2;
  border-radius: 16px;
  justify-content: center;
  margin: 0 10px;
  width: 200px;
`;