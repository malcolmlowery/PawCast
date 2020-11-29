import { fireStore, fireAuth } from '../../firebase/firebase';
import uuid from 'react-uuid';

const NEW_MESSAGE_REQUEST = 'NEW_MESSAGE_REQUEST';
const NEW_MESSAGE_SUCCESS = 'NEW_MESSAGE_SUCCESS';
const NEW_MESSAGE_FAILURE = 'NEW_MESSAGE_FAILURE';

const GET_MESSAGE_SESSION_REQUEST = 'GET_MESSAGE_SESSION_REQUEST';
const GET_MESSAGE_SESSION_SUCCESS = 'GET_MESSAGE_SESSION_SUCCESS';
const GET_MESSAGE_SESSION_FAILURE = 'GET_MESSAGE_SESSION_FAILURE';

const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';

const GET_MESSAGES_REQUEST = 'GET_MESSAGES_REQUEST';
const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';
const GET_MESSAGES_FAILURE = 'GET_MESSAGES_FAILURE';

const newMessageRequest = () => ({
  type: NEW_MESSAGE_REQUEST
});
const newMessageSuccess = (data) => ({
  type: NEW_MESSAGE_SUCCESS,
  payload: data,
});
const newMessageFailure = () => ({
  type: NEW_MESSAGE_FAILURE
});

const sendMessageRequest = () => ({
  type: SEND_MESSAGE_REQUEST
});
const sendMessageSuccess = (data) => ({
  type: SEND_MESSAGE_SUCCESS,
  payload: data,
});
const sendMessageFailure = () => ({
  type: SEND_MESSAGE_FAILURE
});

const getMessageSessionRequest = () => ({
  type: GET_MESSAGE_SESSION_REQUEST
});
const getMessageSessionSuccess = (data) => ({
  type: GET_MESSAGE_SESSION_SUCCESS,
  payload: data,
});
const getMessageSessionFailure = () => ({
  type: GET_MESSAGE_SESSION_FAILURE
});

const getMessagesRequest = () => ({
  type: GET_MESSAGES_REQUEST
});
const getMessagesSuccess = (data) => ({
  type: GET_MESSAGES_SUCCESS,
  payload: data,
});
const getMessagesFailure = () => ({
  type: GET_MESSAGES_FAILURE
});

export const getMessages = () => {
  return async (dispatch) => {
    dispatch(getMessagesRequest())

    const messageData = await fireStore
      .collection('messages')
      .where('member_uids', 'array-contains', fireAuth.currentUser.uid)
      .get()
      .then(snapshot => {
        const data = [];
        snapshot.forEach(doc => data.push(doc.data()))
        return data;
      })

    dispatch(getMessagesSuccess(messageData))
  }
}

export const getMessageSession = (userId) => {
  return async (dispatch) => {
    dispatch(getMessageSessionRequest())

    await fireStore
      .collection(`messages/${userId}/chats`)
      .get()
      .then(snapshot => {
        if(snapshot.empty === true) {
          return dispatch(getMessageSessionFailure())
        }
        return snapshot.forEach(async (doc) => {
          const message_session_id = doc.data().message_session_id;
          
          const chatData = await fireStore
            .collection('messages')
            .doc(userId)
            .collection('chats')
            .orderBy('createdAt', 'desc')
            .get()
            .then(snapshot => {
              const data = [];
              snapshot.forEach(doc => data.push(doc.data()))
              console.log(data)
              return data;
            })

          dispatch(getMessageSessionSuccess({
            chats: chatData, message_session_id
          }))
        })
      })
  }
}

export const sendNewMessage = (userData) => {
  return async (dispatch) => {

    const {
      session_id,
      text,
      userId,
    } = userData;
    
    const currentUserUID = fireAuth.currentUser.uid;
    const messagesCollection = fireStore.collection('messages');
    const usersCollection = fireStore.collection('users');
    const message_session_id = messagesCollection.doc().id;
    const messageDoc = await messagesCollection.where('member_uids', '==', [currentUserUID, userId]).get();
     
    if(session_id == null || messageDoc.size === 0) {
      dispatch(newMessageRequest())

      const currentUserData = await usersCollection
        .doc(currentUserUID)
        .get()
        .then(snapshot => snapshot.data());

      const otherUserData = await usersCollection
        .doc(userId)
        .get()
        .then(snapshot => snapshot.data());

      await messagesCollection
        .doc(message_session_id)
        .set({
          message_session_id,
          member_uids: [ currentUserUID, userId ],
          userInfo: [
            currentUserData,
            otherUserData,
          ]
        });

      await messagesCollection
        .doc(message_session_id)
        .collection('chats')
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

      return dispatch(newMessageSuccess(message_session_id))

    }

    // const members = await  fireStore
    //   .collection('messages')
    //   .where('member_uids', '==', [fireAuth.currentUser.uid, userId])
    //   .get()
    
    // if(members.empty === false) {
    //   await messagesCollection
    //   .doc(session_id)
    //   .collection('chats')
    //   .doc()
    //   .set({
    //     _id: uuid(), 
    //     text, 
    //     createdAt: Date.now(), 
    //     user: { 
    //       avatar: fireAuth.currentUser.photoURL, 
    //       name: fireAuth.currentUser.displayName, 
    //       _id: fireAuth.currentUser.uid 
    //     }
    //   })

      // return dispatch(sendMessageSuccess(session_id))
    // }

  }
};