import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { colors } from '../utils/theme';
import AppHeader from '../components/AppHeader';
import Text from '../components/Text';

const Notifications = ({}) => {
  return (
    <Container>
      <AppHeader>
        <Text color='primary' fontSize={28} fontWeight='semi-bold'>Notifications</Text>
        <Icon />
      </AppHeader>
      <Content>

      </Content>
    </Container>
  )
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);

const Container = styled.View`
  flex: 1;
`;

const Content = styled.View`
  align-items: center;
`;

const Icon = styled.Image`
  height: 38px;
  width: 38px;
  border-radius: 19px;
  background: ${colors.primary};
`;