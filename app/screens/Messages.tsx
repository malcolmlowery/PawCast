import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import Text from '../components/Text';
import AppHeader from '../components/AppHeader';
import { colors } from '../utils/theme';
import { ScrollView } from 'react-native-gesture-handler';
import { getMessages } from '../redux/actions/messageActions';

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
      <ScrollView style={{ marginTop: 3 }}>
        { messages &&
          messages.map((message, index) => {
            // console.log(message.userInfo[1])
            const { firstName, lastName, profileImage, userId } = message.userInfo[1];

            return (
              <ItemGroup key={index} onPress={() => {
                navigation.navigate('chatroom', {
                  message_session_id: message.message_session_id,
                  userId: message.userId,
                })
              }}>
                <ItemLabel>
                  <UserAvatar source={{ uri: profileImage }} />
                  <Text fontSize={15} fontWeight='semi-bold'>{firstName} {lastName}</Text>
                </ItemLabel>
                <Message>

                </Message>
              </ItemGroup>
            )
          })
        }
      </ScrollView>

    </Container>
  )
};

const mapStateToProps = (state) =>({
  messages: state.message_session.messages,
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
  margin: 3px 10px;
  padding: 8px;
  border-radius: 8px;
`;

const ItemLabel = styled.View`
  align-items: center;
  flex-direction: row;
`;

const UserAvatar = styled.Image`
  border-radius: 18px;
  height: 36px;
  width: 36px;
  margin-right: 10px;
`;

const Message = styled.View`

`;