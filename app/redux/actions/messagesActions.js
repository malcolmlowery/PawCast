import { fireAuth, fireStore } from "../../firebase/firebase";

const GET_MESSAGES_REQUEST = 'GET_MESSAGES_REQUEST';
const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';
const GET_MESSAGES_FAILURE = 'GET_MESSAGES_FAILURE';

const CREATE_MESSAGE_REQUEST = 'CREATE_MESSAGE_REQUEST';
const CREATE_MESSAGE_SUCCESS = 'CREATE_MESSAGE_SUCCESS';
const CREATE_MESSAGE_FAILURE = 'CREATE_MESSAGE_FAILURE';

const getMessagesRequest = () => ({
  type: GET_MESSAGES_REQUEST,
});

const getMessagesSuccess = (data) => ({
  type: GET_MESSAGES_SUCCESS,
  payload: data,
});

const getMessagesFailure = () => ({
  type: GET_MESSAGES_FAILURE,
});

export const getMessages = () => {
  return async (dispatch) => {
    try {
      dispatch(getMessagesRequest())
      const messages = await fireStore
        .collection('messages')
        .where('users', 'array-contains', fireAuth.currentUser.uid)
        .get()
        .then(snapshot => {
          const data = [];
          snapshot.forEach(doc => data.push(doc.data()))
          // console.log(data)
          return data;
        })
      
      dispatch(getMessagesSuccess(messages))
    }
    catch(error) {
      dispatch(getMessagesFailure(error))
    }
  }
}

const createMessageRequest = () => ({
  type: CREATE_MESSAGE_REQUEST,
});

const createMessageSuccess = (data) => ({
  type: CREATE_MESSAGE_SUCCESS,
  payload: data,
});

const createMessageFailure = () => ({
  type: CREATE_MESSAGE_FAILURE,
});

export const createMessage = (userInfo) => {
  return async (dispatch) => {
    try {
      dispatch(createMessageRequest())

      const message_session_id = fireStore.collection('messages').doc().id;

      const currentUser = await fireStore
        .collection('users')
        .doc(fireAuth.currentUser.uid)
        .get()
        .then(snapshot => snapshot.data())

      const convo = await fireStore
        .collection('messages')
        .doc(message_session_id)
        .set({
          message_session_id,
          users: [
            currentUser.userId,
            userInfo.userId
          ],
          otherUser: userInfo
        })

      dispatch(createMessageSuccess())
    }
    catch(error) {
      dispatch(createMessageFailure(error))
    }
  }
}