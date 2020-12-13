import React from 'react';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../components/Button';
import Text from '../../components/Text';
import { Dimensions } from 'react-native';

const height = Dimensions.get('screen').height;

const PremiumSignUp = ({ navigation }) => {
  return (
    <Container>

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

      <Content>
        <Text fontSize={20} fontWeight='semi-bold'>Choose your specialty</Text>
        <SpecialtyOptions>
          <Button height={35} fontSize={14} expand='none' onPress={() => navigation.push('premium-services', { specialty: 'Breeder' })}>Breeder</Button>
          <Button height={35} fontSize={14} expand='none' onPress={() => navigation.push('premium-services', { specialty: 'Trainer' })}>Trainer</Button>
          <Button height={35} fontSize={14} expand='none' onPress={() => navigation.push('premium-services', { specialty: 'Veterinarian' })}>Veterinarian</Button>
        </SpecialtyOptions>
      </Content>
    </Container>
  )
};

export default PremiumSignUp;

const Container = styled.View`
  align-items: center;
  background-color: red;
  flex: 1;
  justify-content: center;
`;

const Content = styled.View`
  align-items: center;
  box-shadow: 0 4px 16px rgba(0,0,0, 0.1);
  background: #fff;
  border-radius: 16px;
  padding: 24px 24px;
`;

const SpecialtyOptions = styled.View`
  margin-top: 10px;
  justify-content: space-around;
  height: 150px;
  width: 200px;
`;