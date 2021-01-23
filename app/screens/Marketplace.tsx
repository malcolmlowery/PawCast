import React, { useEffect, useState } from 'react';
import { Alert, RefreshControl, ScrollView, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import Button from '../components/Button';
import CreatePostForm from '../components/CreatePostForm';
import PremiumCard from '../components/PremiumCard';
import Text from '../components/Text';
import { createPremiumPost } from '../redux/actions/premiumAccountActions/createPremPostAction';
import { filterByType, getPremiumPosts } from '../redux/actions/premiumAccountActions/getPremPosts';
import { colors } from '../utils/theme';
import * as ImagePicker from 'expo-image-picker';
import { fireAuth } from '../firebase/firebase';

const DropDown = ({ 
  labels, 
  onValueChange, 
  title,
}) => {
  return (
    <View 
      style={{ 
        alignItems: 'flex-end'
      }}
    >
      <View 
      style={{ 
        backgroundColor: colors.primary, 
        width: 170, 
        borderRadius: 3, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-end' 
      }}>
    <Text fontWeight='semi-bold' color='white' fontSize={15} left={4}>{title}</Text>
    <View 
      style={{ 
        padding: 8, 
        backgroundColor: '#f4f4f4', 
        width: 120,
        marginLeft: 10,
      }}
    >
      <RNPickerSelect
        onValueChange={(value) => onValueChange(value)}
        items={labels}
      />
    </View>
    </View>
    </View>
  )
};

const Marketplace = ({
  createPost,
  getPosts,
  navigation,
  user,
  posts,
  isLoading,
  filterByType
}) => {

  useEffect(() => {
    getPosts()
  }, [])

  const [filterBy, setFilterBy] = useState(null);
  const [postFormVisible, setPostFormVisible] = useState(false);
  const [description, setDescription] = useState('');

  const [image, setImage] = useState(null);

  const openImagePicker = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    let result: any = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    });
    
    if(permissionResult.granted === false) {
      return (
        Alert.alert(
          'Permission Denied',
          'Permission to access camera roll is required!'
        )
      )
    }
        
    if(!result.cancelled) {
      setImage(result.uri)
    }
  }

  const onSubmitPost = () => {
    const userInput = { description, image };
    createPost(userInput)
  }

  return (
    <>
      { 
        postFormVisible &&
        <CreatePostForm 
          submit={() => onSubmitPost()}
          visible={() => setPostFormVisible(!postFormVisible)}
          text={description}
          onChangeText={(text => setDescription(text))}
          openImagePicker={() => openImagePicker()}
          image={image}
        /> 
      }

      <Container>
        <Header>
          <HeaderTitle>
            <Text 
              color='primary' 
              fontSize={32} 
              fontWeight='bold'
              position='relative'
              left={10}>
                Marketplace
            </Text>

            <ProfileButton onPress={() => navigation.push('premium-profile', { uid: fireAuth.currentUser.uid })}>
              <Icon source={{ uri: fireAuth.currentUser.photoURL }} />
            </ProfileButton>
          </HeaderTitle>
          <HeaderOptions>
            { user?.premium_user ?
              <Button marginLeft={17} color='white' expand='none' height={35}  width={100} fontSize={14} fill='primary' right={16} onPress={() => setPostFormVisible(!postFormVisible)}>
                New Post
              </Button>
            :
              <Button color='alert' fill='none' fontSize={14} expand='none' onPress={() => navigation.push('premium-signup')}>Become a Member</Button>
            }
            <DropDown 
              title='Filter'
              labels={[
                { label: 'Breeders', value: 'breeder' },
                { label: 'Trainers', value: 'trainer' },
                { label: 'Veterinarian', value: 'veterinarian' },
              ]} 
              onValueChange={(value) => {
                setFilterBy(value)
                filterByType(value)
              }} 
            />
          </HeaderOptions>
        </Header>

        <Content>
          <ScrollView 
            refreshControl={
              <RefreshControl 
                refreshing={isLoading} 
                onRefresh={getPosts}
              />
            }
            style={{ paddingTop: 10 }}
          >
          { posts &&
            posts.map((post, index) => {
              
              const specialtyColor = () => {
                if(post?.postOwner?.specialty === 'breeder') {
                  return colors.primary
                }
                if(post?.postOwner?.specialty === 'trainer') {
                  return '#9c27b0'
                }
                if(post?.postOwner?.specialty === 'veterinarian') {
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
                  specialty={post.postOwner?.specialty}
                  verified={post.postOwner?.verified}
                  city={post.postOwner?.location.city}
                  state={post.postOwner?.location.state}
                  postImages={post.postImages}
                  displayName={post.displayName}
                  dogType={post.dogType}
                  capsuleColor={specialtyColor()}
                />
              )
            })
          }
          </ScrollView>
        </Content>
      </Container>
    </>
  )
};

const mapStateToProps = (state) => ({
  user: state.user?.user,
  posts: state.premiumPosts?.posts,
  isLoading: state.premiumPosts?.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  createPost: (userInput) => dispatch(createPremiumPost(userInput)),
  getPosts: () => dispatch(getPremiumPosts()),
  filterByType: (filterType) => dispatch(filterByType(filterType))
});

export default connect(mapStateToProps, mapDispatchToProps)(Marketplace);

const Container = styled.View`
  flex: 1;
  background: #fff;
`;  

const Header = styled.View`
  padding-top: 50px;
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom-color: #f2f2f2;
  border-bottom-width: 1px;
`;

const Content = styled.View`
  background-color: #fff;
  flex: 1;
`;

const HeaderOptions = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 6px;
  padding-bottom: 6px;
  padding: 0 10px;
`;

const HeaderTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ProfileButton = styled.TouchableOpacity`
  box-shadow: 0 4px 12px rgba(0,0,0, 0.15); 
  height: 38px;
  width: 38px;
  margin-right: 10px;
`;

const Icon = styled.Image`
  border-radius: 19px;
  background: ${colors.primary};
  border-width: 1px;
  border-color: ${colors.white};
  height: 38px;
  width: 38px;
`;