import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import AppHeader from '../components/AppHeader';
import Text from '../components/Text';
import { colors } from '../utils/theme';
import { connect } from 'react-redux';
import { fireAuth, fireStore } from '../firebase/firebase';
import { getMessageSession, sendNewMessage } from '../redux/actions/messageActions';
import uuid from 'react-uuid';

const Messages = ({
  navigation,
  route,
  session_id,
  sendNewMessage,
}) => {
  const { message_session_id, userId } = route.params;
  const [text, setText] = useState('');
  const [messages, setMessages]: any = useState();

  useEffect(() => {
    fireStore
      .collection(`messages/${message_session_id}/chats`).orderBy('createdAt', 'asc')
      .onSnapshot(query => {
        query
          .docChanges()
          .map(({ doc }) => {
            setMessages(prev => GiftedChat.append(prev, doc.data()))
          })
      })
  }, [])

  const onSendMessage = async () => {
    const data = {
      session_id,
      text,
      userId,
    };

    const exists = await fireStore
      .collection(`messages`)
      .where('message_session_id', '==', message_session_id)
      .get()
      .then(snapshot => snapshot.empty);

    console.log(exists)
    if(exists == true) {
      setMessages(prev => GiftedChat.append(prev, {
        _id: uuid(), 
          text,
          createdAt: Date.now(), 
          user: { 
            avatar: fireAuth.currentUser.photoURL, 
            name: fireAuth.currentUser.displayName, 
            _id: fireAuth.currentUser.uid 
          }
      }))
      return sendNewMessage(data)
    }

    return await fireStore
      .collection(`messages/${message_session_id}/chats`)
      .doc()
      .set({
        _id: uuid(), 
          text,
          createdAt: Date.now(), 
          user: { 
            avatar: fireAuth.currentUser.photoURL, 
            name: fireAuth.currentUser.displayName, 
            _id: fireAuth.currentUser.uid 
          }
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
      </AppHeader>

      <GiftedChat
        onInputTextChanged={(text) => setText(text)}
        text={text}
        messages={messages}
        onSend={() => onSendMessage()}
        showAvatarForEveryMessage={true}
        renderUsernameOnMessage={true}
        renderAvatarOnTop={true}
        renderBubble={props => {
          return (
            <Bubble 
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: colors.primary
                },
                left: {
                  backgroundColor: '#dfdfdf',
                }
              }}
            />
          )
        }}
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
  chats: state.message_session.chats,
  session_id: state.message_session.session,
});

const mapDispatchToProps = (dispatch) => ({
  getSession: (userData) => dispatch(getMessageSession(userData)),
  sendNewMessage: (userData) => dispatch(sendNewMessage(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);

const Container = styled.View`
  flex: 1;
`;

const TitleArea = styled.View`
  align-items: center;
  flex-direction: row;
`;

const ChatHeader = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const ChatHeaderAvatar = styled.Image`
  border-radius: 25px;  
  height: 50px;
  width: 50px;
`;