import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, StatusBar, Dimensions, Modal } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import styled from 'styled-components/native';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { createUser } from '../redux/actions/createUserAction';
import { colors } from '../utils/theme';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import Terms from './Terms';
import PrivacyPolicy from '../components/PrivacyPolicyModal';

const height = Dimensions.get('screen').height;

const SignUp = ({ createNewUser, navigation }) => {

  const [shiftCard, setShiftCard] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [userAgree, setUserAgree] = useState(false);
  const [pol, setPolVisible] = useState(false);
  
  const openImagePicker = async () => {
    const premissions = await ImagePicker.requestCameraPermissionsAsync();
    const result: any = await ImagePicker.launchImageLibraryAsync({
      base64: true
    });

    if(premissions.granted === false) {
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

  const onSubmit = () => {
    const userInput = {
      firstName,
      lastName,
      email,
      password,
      zipcode,
      image,
      userAgree,
    }
    const validZipcode = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/;
    
    if(validZipcode.test(zipcode) === true) {
      return createNewUser(userInput)
    } else {
      return console.log('Not a zipcode!')
    }
  }

  return (
    <>
      <Modal
        animationType='slide'
        visible={modalVisible}
        transparent={true}
      >
        <>
          <Terms 
          cancel={() => setModalVisible(!modalVisible)} 
          onAgree={() => {
              setUserAgree(!userAgree)
              onSubmit()
          }} 
          />
        </>
      </Modal>

      <Modal
        animationType='slide'
        visible={pol}
        transparent={true}
      >
        <>
          <PrivacyPolicy cancel={() => setPolVisible(!pol)} />
        </>
      </Modal>

      <Container onStartShouldSetResponder={Keyboard.dismiss}>
        <LinearGradient
          colors={['#3949ab', '#303f9f']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height,
          }}
        />
        <StatusBar barStyle='light-content'/>
        
        <KeyboardAvoidingView enabled={shiftCard} behavior='position' contentContainerStyle={{ paddingBottom: 30 }}>
          <Card>

            <Text>Pawcast</Text>

            <InputGroup>
              <TextInput label='First Name' value={firstName} onChangeText={(text) => setFirstName(text)} onFocus={() => setShiftCard(false)} />
              <TextInput label='Last Name' value={lastName} onChangeText={(text) => setLastName(text)} onFocus={() => setShiftCard(false)} />
              <TextInput label='Zip Code' value={zipcode} onChangeText={(text) => setZipcode(text)} onFocus={() => setShiftCard(false)} />
              <TextInput label='Email' value={email} onChangeText={(text) => setEmail(text)} onFocus={() => setShiftCard(true)} />
              <TextInput label='Password' value={password} onChangeText={(text) => setPassword(text)} onFocus={() => setShiftCard(true)} />
              <TextInput label='Confirm Password' value={confirmPassword} onChangeText={(text) => setConfirmPassword(text)} onFocus={() => setShiftCard(true)} />
            </InputGroup>

            <Button 
              fill='primary'
              fontSize={14}
              color='white'
              marginTop={24}
              marginBottom={16}
              onPress={() => setModalVisible(!modalVisible)}>
              Sign Up
            </Button>

            <Button 
              fill='none' 
              fontSize={14}
              color='danger'
              onPress={() => navigation.pop()}>
              Have an account?
            </Button>

            <Button 
              fill='none' 
              fontSize={14}
              color='danger'
              marginTop={4}
              onPress={() => setPolVisible(!pol)}>
              Privacy Policy
            </Button>

          </Card>
        </KeyboardAvoidingView>
      </Container>
    </>
  )
};

const mapDisptachToProps = (dispatch) => ({
  createNewUser: (userInput) => dispatch(createUser(userInput))
});

export default connect(null, mapDisptachToProps)(SignUp);

const Container = styled.View`
  align-items: center;
  background-color: ${colors.primary};
  flex: 1;
  justify-content: center;
`;

const Card = styled.View`
  box-shadow: 0 4px 12px rgba(0,0,0, 0.2);
  background: #fff;
  border-radius: 16px;
  padding: 32px 16px;
  width: 340px;
`;

const InputGroup = styled.View`
  margin-bottom: 16px;
`;

const Text = styled.Text`
  color: ${colors.primary};
  font-size: 28px;
  font-weight: 500;
  padding: 8px 0;
  padding-bottom: 16px;
  text-align: center;
`;