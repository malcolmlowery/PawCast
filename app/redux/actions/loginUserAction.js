import { fireAuth, fireStore } from '../../firebase/firebase';
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from './Types';

export const loginUserRequest = () => ({
  type: LOGIN_USER_REQUEST
});

export const loginUserSuccess = (data) => ({
  type: LOGIN_USER_SUCCESS,
  payload: data
});

export const loginUserFailure = (error) => ({
  type: LOGIN_USER_FAILURE,
  payload: error
});

export const loginUserBanned = (message) => ({
  type: 'LOGIN_USER_BANNED',
  payload: message
});

export const loginUser = (email, password) => {
  return async (dispatch) => {
    dispatch(loginUserRequest())

    try{
      const isBanned = await fireStore
      .collection('banned_users')
      .where('email', '==', email.toLowerCase())
      .get()
      .then(snapshot => snapshot.size)

      if(isBanned == 1) {
        console.log(isBanned)
        return dispatch(loginUserBanned({ message: 'This account is banned from the community!'}))
      } else {
        return await fireAuth
          .signInWithEmailAndPassword(email.trim().toLowerCase(), password.trim())
          .then(user => {
            console.log('LOGGED IN')
            dispatch(loginUserSuccess())
          })
          .catch(error => {
            console.log(error.code)
            dispatch(loginUserFailure(error.code.replace('auth/', '').replaceAll('-', ' ')))
          })
      }
    }
    catch(error) {
      dispatch(loginUserFailure(error))
    }
  }
};