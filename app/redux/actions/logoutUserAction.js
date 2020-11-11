import { fireAuth } from '../../firebase/firebase';
import {
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
} from './Types';

const logoutUserRequest = () => ({
  type: LOGOUT_USER_REQUEST
});

const logoutUserSuccess = () => ({
  type: LOGOUT_USER_SUCCESS,
});

const logoutUserFailure = () => ({
  type: LOGOUT_USER_FAILURE
});


export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(logoutUserRequest())
    try {
      await fireAuth
        .signOut()
        .then(() => dispatch(logoutUserSuccess()))
    }
    catch(error) {
      dispatch(logoutUserFailure(error))
    }
  }
}