import { fireAuth } from '../../firebase/firebase';
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

export const loginUserFailure = () => ({
  type: LOGIN_USER_FAILURE
});

export const loginUser = (email, password) => {
  return (dispatch) => {
    dispatch(loginUserRequest())
    try{
      fireAuth
        .signInWithEmailAndPassword(email.trim(), password.trim())
        .then(() => dispatch(loginUserSuccess()))
        .catch(error => dispatch(loginUserFailure(error)))
    }
    catch(error) {
      dispatch(loginUserFailure(error))
    }
  }
};