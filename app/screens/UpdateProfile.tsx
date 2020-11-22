import React, { useState } from 'react';
import styled from 'styled-components/native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { fireAuth, fireStorage, fireStore } from '../firebase/firebase';
import AppHeader from '../components/AppHeader';
import Button from '../components/Button';
import { colors } from '../utils/theme';
import Text from '../components/Text';
import TextInput from '../components/TextInput';
import { Alert, Keyboard } from 'react-native';
import uuid from 'react-uuid'

const UpdateProfile = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');

  const openImagePicker = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    let result: any = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 1,
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

  const onSubmit = async () => {
    const imageBlob = await fetch(image).then(response => response.blob());
    const urlOfImage = await fireStorage
      .ref()
      .child(`image-${uuid()}.jpg`)
      .put(imageBlob)
      .then(snapshot => {
        return snapshot.ref.getDownloadURL().then(url => url)
      })
      .catch(error => console.log(error))
      
      const uid = fireAuth.currentUser.uid;
        console.log(uid)
        fireStore.collection('users').doc(uid).update({ profileImage: urlOfImage })
        fireStore.collection('user_locations').doc(uid).update({ profileImage: urlOfImage })
        fireStore.collection('posts').doc(uid).update({ profileImage: urlOfImage })
        console.log('DONE')
        
    const userInput: any = {
      location,
      email,
    }
    
    fireAuth.currentUser.updateProfile({
      photoURL: urlOfImage
    })
    
    if (email == null || '') {
      fireAuth.currentUser.updateEmail(email).then(() => fireAuth.signOut())
    }
  }

  return (
    <Container>
      <AppHeader>
        <TitleArea onStartShouldSetResponder={() => navigation.pop()}>
          <Ionicons 
            color={colors.primary} 
            name='ios-arrow-back' 
            size={30} 
          />
          <Text color='primary' fontSize={18} fontWeight='semi-bold' left={10}>Back</Text>
        </TitleArea>
      </AppHeader>

      <Content onStartShouldSetResponder={Keyboard.dismiss}>
        <ProfileImageContainer>
          <ProfileImage source={{ uri: image != null ? image : fireAuth.currentUser.photoURL }} />
        </ProfileImageContainer>

        <UpdateProfileImageContainer onPress={() => openImagePicker()}>
          <Text fontSize={14} fontWeight='semi-bold'>Change Profile Picture</Text>
          <ProfileImageContent>
          <Ionicons color={colors.white} name='ios-camera' size={42} />
          </ProfileImageContent>
        </UpdateProfileImageContainer>

        <TextInput styles={{ backgroundColor: '#e8e8e8' }} label='Location' onChangeText={(text) => setLocation(text)} placeholder='Fort Lauderdale, FL' />
        <TextInput styles={{ backgroundColor: '#e8e8e8' }} label='Email' onChangeText={(text) => setEmail(text)} placeholder={fireAuth.currentUser.email} />
        <ButtonGroup>
          <Button expand='none' fontSize={14} fill='danger' height={40} marginTop={20} width={170} onPress={() => navigation.pop()}>Cancel</Button>
          <Button expand='none' fontSize={14} height={40} marginTop={20} width={170} onPress={() => onSubmit()}>Update Profile</Button>
        </ButtonGroup>
      </Content>
    </Container>
  )
};

export default UpdateProfile;

const Container = styled.View`
  background: #fff;
  flex: 1;
`;

const TitleArea = styled.View`
  align-items: center;
  flex-direction: row;
`;

const Content = styled.View`
  margin: 10px;
`;

const ProfileImageContainer = styled.View`
  align-items: center;
  box-shadow: 0 4px 12px rgba(0,0,0, 0.15);
  height: 150px;
  justify-content: center;
`;

const ProfileImage = styled.Image`
  border-radius: 50px;
  border-width: 3px;
  border-color: ${colors.white};
  height: 100px;
  width: 100px;
`;

const ButtonGroup = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 20px;
`;

const UpdateProfileImageContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 100px;
`;

const ProfileImageContent = styled.View`
  align-items: center;
  background: ${colors.primary};
  border-radius: 30px;
  height: 60px;
  justify-content: center;  
  margin-top: 10px;
  width: 60px;
`;