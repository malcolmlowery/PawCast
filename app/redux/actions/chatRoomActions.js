import uuid from "react-uuid";
import { fireAuth, fireStore } from "../../firebase/firebase";

const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';
const GET_CHAT_REQUEST = 'GET_CHAT_REQUEST';
const GET_CHAT_SUCCESS = 'GET_CHAT_SUCCESS';
const GET_CHAT_FAILURE = 'GET_CHAT_FAILURE';

const getChatRequest = () => ({
  type: GET_CHAT_REQUEST,
});

const getChatSuccess = (data) => ({
  type: GET_CHAT_SUCCESS,
  payload: data,
});

const getChatFailure = () => ({
  type: GET_CHAT_FAILURE,
});

export const getChatMessages = (message_session_id) => {
  return async (dispatch) => {
    try {
      dispatch(getChatRequest())
      
      const chatMessages = await fireStore
        .collection(`messages/${message_session_id}/chats`)
        .orderBy('createdAt', 'desc')
        .get()
        .then(snapshot => {
          const data = [];
          snapshot.forEach(doc => data.push(doc.data()))
          // console.log(data)
          return data;
        })

      dispatch(getChatSuccess(chatMessages))
    }
    catch(error) {
      dispatch(getChatFailure(error))
    }
  }
}



const sendMessageRequest = () => ({
  type: SEND_MESSAGE_REQUEST,
});

const sendMessageSuccess = (data) => ({
  type: SEND_MESSAGE_SUCCESS,
  payload: data,
});

const sendMessageFailure = () => ({
  type: SEND_MESSAGE_FAILURE,
});

export const sendMessage = (data) => {
  return async (dispatch) => {
    dispatch(sendMessageRequest())

    const messageData = {
      _id: uuid(), 
      text: data.text, 
      createdAt: Date.now(), 
      user: { 
        avatar: fireAuth.currentUser.photoURL, 
        name: fireAuth.currentUser.displayName, 
        _id: fireAuth.currentUser.uid 
      }
    }

    await fireStore
      .collection(`messages/${data.message_session_id}/chats`)
        .doc()
        .set(messageData)

      dispatch(sendMessageSuccess(messageData))

      console.log(messageData)

  }
}