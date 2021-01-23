import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import AppHeader from '../components/AppHeader';
import Text from '../components/Text';
import { colors } from '../utils/theme';
import { connect } from 'react-redux';
import { fireAuth, fireStore } from '../firebase/firebase';
import { createChatMessage, getChatMessageRoom } from '../redux/Messages/ChatRoomActions';

const Messages = ({
  navigation,
  route,
  getChatRoom,
  createChatMessage,
  chatroomID,
  popChatSesionId,
}) => {
  const { userProfileId } = route.params;
  const [inputText, setInputText] = useState('');
  const [messages, setMessages]: any = useState([]);
  
  useEffect(() => {
    getChatRoom(userProfileId)
    fireStore
      .collection(`messages`)
      .where('members', 'array-contains', fireAuth.currentUser.uid)
      .get()
      .then(async (snapshot) => {

        snapshot.forEach(doc => {
          doc.data().members.find(user => {
            if(user == userProfileId) {
              return fireStore
              .collection(`messages/${doc.data().chatroomId}/chatroom`)
              .orderBy('createdAt', 'asc')
              .onSnapshot(query => {
                query
                  .docChanges()
                  .forEach(({ doc }) => {
                    setMessages(prev => GiftedChat.append(prev, doc.data()))
                  })
              }) 
            }
          })
        })
        
      })

  
  }, [])

  
  return (
    <Container>
      <AppHeader height={100}>
        <TitleArea onStartShouldSetResponder={() => {
          popChatSesionId()
          navigation.pop()
        }}>
          <Ionicons 
            color={colors.primary} 
            name='ios-arrow-back' 
            size={30} 
          />
          <Text color='primary' fontSize={18} fontWeight='semi-bold' left={10}>Back</Text>
        </TitleArea>
      </AppHeader>

      <GiftedChat
        onInputTextChanged={(text) => setInputText(text)}
        text={inputText}
        messages={messages}
        onSend={() => createChatMessage(userProfileId, inputText, chatroomID)}
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
  chatroomID: state.chatroom.chatroomID
});

const mapDispatchToProps = (dispatch) => ({
  getChatRoom: (userProfileId) => dispatch(getChatMessageRoom(userProfileId)),
  createChatMessage: (userProfileId, text, chatroomID) => dispatch(createChatMessage(userProfileId, text, chatroomID)),
  popChatSesionId: () => dispatch({
    type: 'POP_SESSION_ID',
  })
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