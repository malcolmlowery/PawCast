import { fireAuth, fireStore, firebase } from '../../firebase/firebase';
import { 
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
} from './loginUserAction';
import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
} from './Types';

const createUserRequest = () => ({
  type: CREATE_USER_REQUEST
});

const createUserSuccess = () => ({
  type: CREATE_USER_SUCCESS
});

const createUserFailure = () => ({
  type: CREATE_USER_FAILURE
});

export const createUser = (userInput) => {
  const {
    firstName,
    lastName,
    email,
    password,
    zipcode,
  } = userInput

  return async (dispatch) => {
    try {
      dispatch(createUserRequest())

      await fireAuth
        .createUserWithEmailAndPassword(email, password)
        .then(({ user }) => {
          dispatch(createUserSuccess())
          fireStore
            .collection('users')
            .add({
              userId: user.uid,
              firstName,
              lastName,
              email,
              zipcode,
            })
        })
        .then(() => {
          dispatch(loginUserRequest())
          fireAuth
            .signInWithEmailAndPassword(email, password)
            .then(user => dispatch(loginUserSuccess(user)))
        })
        .catch(error => dispatch(loginUserFailure(error)))
    }
    catch(error) {
      dispatch(createUserFailure(error))
    }
  }
}