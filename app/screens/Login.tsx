import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { loginUser } from '../redux/actions/loginUserAction';
import { colors } from '../utils/theme';

const Login = ({ navigation, login }) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    return login(email, password)
  }

  return (
    <Container onStartShouldSetResponder={Keyboard.dismiss}>
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

          <Button 
            fill='primary'
            fontSize={14}
            color='white'
            marginTop={24}
            marginBottom={16}
            onPress={() => onSubmit()}>
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
            marginTop={16}>
            forgot password
          </Button>

        </Card>
      </KeyboardAvoidingView>
    </Container>
  )
};

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(loginUser(email, password))
})

export default connect(null, mapDispatchToProps)(Login);

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
  color: #345ccb;
  font-size: 28px;
  font-weight: 500;
  padding: 8px 0;
  padding-bottom: 16px;
  text-align: center;
`;