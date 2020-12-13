import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import Button from '../../components/Button';
import Text from '../../components/Text';
import { upgradeUserProfile } from '../../redux/actions/premiumAccountActions/generatePremAcc';

const PremiumServices = ({ route, upgradeUser, user, navigation }) => {

  const {
    specialty
  } = route.params;

  return (
    <Container>

      <Content>
        <Text position='relative' top={24} fontSize={24} fontWeight='bold' color='primary'>{specialty} Specialty</Text>
        <Text 
          position='relative' 
          top={40} 
          fontSize={20} 
          fontWeight='semi-bold'>
            Becoming a member allows for your profile to stand out! 
            Users will be able to see that you are verfied to perform 
            your services as a <Text color='alert' fontWeight='bold'>{specialty.toLowerCase()}</Text>.
        </Text>
        <SpecImage>
          <Image source={require('../../../assets/premium-look.png')} />
        </SpecImage>

        <ButtonGroup>
          <Button fontSize={14} height={38} expand='none' onPress={() => upgradeUser(specialty.toLowerCase()).then(() => navigation.pop(2))}>Verify My Account</Button>
          <Button fontSize={14} height={38} expand='none' fill='alert'>Cancel</Button>  
        </ButtonGroup>
  </Content>

    </Container>
  )
};

const mapDispatchToProps = dispatch => ({
  upgradeUser: (specialty) => dispatch(upgradeUserProfile(specialty))
});

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps, mapDispatchToProps)(PremiumServices);

const Container = styled.View`
  align-items: center;
  background-color: #fff;
  flex: 1;
  justify-content: center;
  padding: 0 10px;
`;

const Content = styled.View`
  flex: 1;
  width: 100%;
  margin: 48px;
`;

const SpecImage = styled.View`
  box-shadow: 0 4px 16px rgba(0,0,0, 0.1);
  align-items: center;
  height: 300px;
  width: 100%;
  margin-top: 70px;
`;

const Image = styled.Image`
  height: 100%;
  border-radius: 16px;
  width: 300px;
`;

const ButtonGroup = styled.View`
  margin-top: 24px;
  height: 100px;
  width: 100%;
  justify-content: space-around;
`;