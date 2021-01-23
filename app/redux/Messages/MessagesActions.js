import { fireStore, fireAuth } from "../../firebase/firebase";

const GET_MESSAGES_REQUEST = 'GET_MESSAGES_REQUEST';
const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';
const GET_MESSAGES_FAILURE = 'GET_MESSAGES_FAILURE';

const getMessagesRequest = () => ({
  type: GET_MESSAGES_REQUEST
});

const getMessagesSuccess = (data) => ({
  type: GET_MESSAGES_SUCCESS,
  payload: data
});

const getMessagesFailure = () => ({
  type: GET_MESSAGES_FAILURE
});

export const getAllMessages = () => {
  return async (dispatch) => {
    dispatch(getMessagesRequest())

    fireStore
      .collection('messages')
      .where('members', 'array-contains', fireAuth.currentUser.uid)
      .get()
      .then(snapshot => {
        const data = [];
        snapshot.forEach(doc => {
          data.push(doc.data())
        })
        dispatch(getMessagesSuccess(data))
      })
      .catch(error => dispatch(getMessagesFailure(error)))
  }
}