import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import Text from '../components/Text';
import AppHeader from '../components/AppHeader';
import { getMessages } from '../redux/actions/messagesActions';
import { colors } from '../utils/theme';

const Messages = ({
  getMessages,
  messages,
  navigation,
}) => {

  useEffect(() => {
    getMessages()
  }, [])

  return (
    <Container>

      <AppHeader>
        <Text color='primary' fontSize={28} fontWeight='semi-bold'>Messages</Text>
      </AppHeader>

      { messages &&
        messages.map((message, index) => {

          const { firstName, lastName, profileImage } = message?.otherUser;

          return (
            <ItemGroup key={index} onPress={() => {
              navigation.push('chatroom', {
                message_session_id: message.message_session_id
              })
            }}>
              <ItemLabel>
                <UserAvatar source={{ uri: profileImage }} />
                <Text fontWeight='semi-bold'>{firstName} {lastName}</Text>
              </ItemLabel>
              <Message>

              </Message>
            </ItemGroup>
          )
        })
      }

    </Container>
  )
};

const mapStateToProps = (state) =>({
  messages: state.messages.data
});

const mapDispatchToProps = (dispatch) =>({
  getMessages: () => dispatch(getMessages()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);

const Container = styled.View`
  flex: 1;
`;

const TitleArea = styled.View`
  align-items: center;
  flex-direction: row;
`;

const ItemGroup = styled.TouchableOpacity`
  background: #fff;
  padding: 8px;
  border-bottom-width: 1px;
  border-color: #e1e1e1;
`;

const ItemLabel = styled.View`
  align-items: center;
  flex-direction: row;
`;

const UserAvatar = styled.Image`
  border-radius: 18px;
  height: 30px;
  width: 30px;
  margin-right: 10px;
`;

const Message = styled.View`

`;