import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { GiftedChat } from 'react-native-gifted-chat';
import AppHeader from '../components/AppHeader';
import Text from '../components/Text';
import { colors } from '../utils/theme';
import { connect } from 'react-redux';
import { fireAuth, fireStore } from '../firebase/firebase';
import { getChatMessages, sendMessage } from '../redux/actions/chatRoomActions';

const Messages = ({
  getChatMessages,
  messages,
  navigation,
  route,
  sendMessage,
}) => {
  const { message_session_id } = route.params;
  const [text, setText] = useState('');
  const [chatMessages, setChatMessages] = useState();

  useEffect(() => {
    getChatMessages(message_session_id)
    // setChatMessages(messages)
    fireStore.collection(`messages/${message_session_id}/chats`)
      .onSnapshot(query => {
        query
          .docChanges()
          .map(({ doc }) => {
            setChatMessages(prevChats => GiftedChat.append(prevChats, doc.data()))
          }
      )})

  }, [])

  const onSendMessage = () => {
    sendMessage({
      text,
      message_session_id
    })
  }

  return (
    <Container>
      <AppHeader height={100}>
        <TitleArea onStartShouldSetResponder={() => navigation.pop()}>
          <Ionicons 
            color={colors.primary} 
            name='ios-arrow-back' 
            size={30} 
          />
          <Text color='primary' fontSize={18} fontWeight='semi-bold' left={10}>Back</Text>
        </TitleArea>
        {/* <Ionicons 
          color={colors.primary} 
          name='ios-mail' 
          size={32} 
          onPress={() => {}}
        /> */}
      </AppHeader>

      <GiftedChat
        onInputTextChanged={(text) => setText(text)}
        text={text}
        messages={chatMessages}
        onSend={() => onSendMessage()}
        showAvatarForEveryMessage={true}
        renderUsernameOnMessage={true}
        user={{ 
          _id: fireAuth.currentUser?.uid,
          name: fireAuth.currentUser?.displayName,
          avatar: fireAuth.currentUser?.photoURL
        }}
      />

    </Container>
  )
}

const mapStateToProps = (state) => ({
  messages: state.chatroom.messages
});

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (text) => dispatch(sendMessage(text)),
  getChatMessages: (message_session_id) => dispatch(getChatMessages(message_session_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);

const Container = styled.View`
  flex: 1;
`;

const TitleArea = styled.View`
  align-items: center;
  flex-direction: row;
`;
