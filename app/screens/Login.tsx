import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, StatusBar, Dimensions, Text as Te, Modal } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { loginUser } from '../redux/actions/loginUserAction';
import { colors } from '../utils/theme';
import { LinearGradient } from 'expo-linear-gradient';
import PrivacyPolicy from '../components/PrivacyPolicyModal';

const height = Dimensions.get('screen').height;

const Login = ({ 
  bannedMessage,
  error,
  navigation, 
  login 
}) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const onSubmit = () => {
    return login(email, password)
  }

  return (
    <>
     <Modal
        animationType='slide'
        visible={modalVisible}
        transparent={true}
      >
        <>
          <PrivacyPolicy cancel={() => setModalVisible(!modalVisible)} />
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

        <KeyboardAvoidingView behavior='position' contentContainerStyle={{ paddingBottom: 30 }}>
          <Card>

            <Text>Pawcast</Text>

            <InputGroup>
              <TextInput 
                label='Email' 
                onChangeText={(text) => setEmail(text)} 
                value={email} 
              />
              <TextInput 
                label='Password' 
                onChangeText={(text) => setPassword(text)} 
                secureTextEntry={true}
                value={password} 
              />
            </InputGroup>

            { error !== undefined && bannedMessage == ''  && 
              <Text style={{ fontSize: 14, color: colors.alert }}>{error}</Text>
            }
            { bannedMessage !== '' && 
              <Text style={{ fontSize: 14, color: colors.alert }}>{bannedMessage}</Text>
            }

            <Button 
              fill='primary'
              fontSize={14}
              color='white'
              marginTop={8}
              marginBottom={16}
              onPress={() => {
                onSubmit()
                if(!error) {
                  navigation.push('newsfeed')
                }
              }
              }>
              Login
            </Button>

            <Button 
              fill='danger' 
              fontSize={14}
              color='white'
              marginBottom={8}
              onPress={() => navigation.push('signup')}>
              Sign Up
            </Button>

            <Button 
              fill='none' 
              fontSize={14}
              color='danger'
              marginTop={16}
              onPress={() => setModalVisible(!modalVisible)}>
              Privacy Policy
            </Button>

          </Card>
        </KeyboardAvoidingView>
      </Container>
    </>
  )
};

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(loginUser(email, password))
});

const mapStateToProps = (state) => ({
  error: state.user.errors,
  bannedMessage: state.user.bannedMessage
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const Container = styled.View`
  align-items: center;
  background-color: ${colors.primary};
  flex: 1;
  justify-content: center;
`;

const Card = styled.View`
  box-shadow: 0 4px 18px rgba(0,0,0, 0.1);
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