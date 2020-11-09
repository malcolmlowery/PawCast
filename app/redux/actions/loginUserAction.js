import { fireAuth } from '../../firebase/firebase';
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from './Types';

const loginUserRequest = () => ({
  type: LOGIN_USER_REQUEST
});

const loginUserSuccess = (data) => ({
  type: LOGIN_USER_SUCCESS,
  payload: data,
});

const loginUserFailure = () => ({
  type: LOGIN_USER_FAILURE
});

export const loginUser = (email, password) => {
  return (dispatch) => {
    dispatch(loginUserRequest())
    try{
      fireAuth.signInWithEmailAndPassword(email.trim(), password.trim())
      .then(({user}) => {
        console.log(user)
        dispatch(loginUserSuccess(user))
      })
      .catch(error => {
        console.log(error)
        dispatch(loginUserFailure(error))
      })
    }
    catch(error) {
      console.log(error)
      dispatch(loginUserFailure(error))
    }
  }
};