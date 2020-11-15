import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/logoutUserAction';
import AppHeader from '../components/AppHeader';
import Button from '../components/Button';
import Text from '../components/Text';

const Settings = ({ logout, navigation }) => {
  return (
    <Container>
      <AppHeader>
        <Text color='primary' fontSize={28} fontWeight='semi-bold'>Settings</Text>
        <Button 
          color='danger' 
          expand='none'
          fill='none' 
          fontSize={14}
          onPress={() => logout()}
          right={16}>
            Sign Out
          </Button>
      </AppHeader>
      <Content>

        <ButtonGroup>
          <CircleButtonItem>
            <CircleButtonIcon onPress={() => navigation.navigate('profile')}>
              <Ionicons name='md-person' color='#fff' size={32} />
            </CircleButtonIcon>
            <CircleButtonLabel>Profile</CircleButtonLabel>
          </CircleButtonItem>

          <CircleButtonItem>
            <CircleButtonIcon>
              <Ionicons name='ios-pin' color='#fff' size={32} />
            </CircleButtonIcon>
            <CircleButtonLabel>Map</CircleButtonLabel>
          </CircleButtonItem>

          <CircleButtonItem>
            <CircleButtonIcon>
              <Ionicons name='ios-paw' color='#fff' size={32} />
            </CircleButtonIcon>
            <CircleButtonLabel>My Pets</CircleButtonLabel>
          </CircleButtonItem>

          <CircleButtonItem>
            <CircleButtonIcon onPress={() => navigation.push('updateProfile')}>
              <Ionicons name='ios-construct' color='#fff' size={32} />
            </CircleButtonIcon>
            <CircleButtonLabel style={{ color: colors.danger }}>Update Profile</CircleButtonLabel>
          </CircleButtonItem>
        </ButtonGroup>
      </Content>
    </Container>
  )
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutUser())
});

export default connect(null, mapDispatchToProps)(Settings);

const Container = styled.View`
  flex: 1;
`;

const Content = styled.View`
  align-items: center;
`;

const ButtonGroup = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: 16px 0;
  width: 100%;
`;

const CircleButtonItem = styled.View`
  align-items: center;
  width: 120px;
`;

const CircleButtonLabel = styled.Text`
  margin: 16px 0;
`;

const CircleButtonIcon = styled.TouchableOpacity`
  align-items: center;
  background: ${colors.primary};
  border-radius: 30px;
  height: 60px;
  justify-content: center;
  width: 60px;
`;