import { fireAuth, fireStorage, fireStore, firebase } from '../../firebase/firebase';
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
    userAgree,
  } = userInput

  return async (dispatch) => {
    try {
      dispatch(createUserRequest())

      const userLocation = await fetch(`https://www.zipcodeapi.com/rest/9q7SAY4YYXHIEyW0rhoX8bw6E4f1y3vUHifq6I866thMNHyxgRRbhBiOk2MpU3Rd/info.json/${zipcode}/degrees`)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          return data
        })
        .catch(error => console.log(error));

      const timestamp = firebase.firestore.Timestamp.now();
      const {
        lat,
        lng,
        city,
        state,
      } = userLocation;

      await fireAuth
        .createUserWithEmailAndPassword(email, password)
        .then(async ({ user }) => {
          const imageUrl = await fireStorage
            .ref()
            .child('empty-profile.png')
            .getDownloadURL()
            .then(url => url)
            .catch(error => console.log(error))

          fireAuth.currentUser.updateProfile({
            photoURL: imageUrl,
            displayName: `${firstName} ${lastName}`
          })
          .catch(error => console.log(error))

          await fireStore
            .collection('terms_agreement')
            .doc(user.uid)
            .set({
              agreedAt: timestamp,
              uid: user.uid,
              name: `${firstName} ${lastName}`
            })
            .catch(error => console.log(error))

          await fireStore
            .collection('users')
            .doc(user.uid)
            .set({
              userId: user.uid,
              firstName,
              lastName,
              email: email.toLowerCase(),
              zipcode,
              profileImage: imageUrl,
              city,
              state,
            })
            .catch(error => console.log(error))

          await fireStore
            .collection('user_locations')
            .doc(user.uid)
            .set({
              firstName,
              lastName,
              lat,
              lng,
              zipcode,
              city,
              state,
              uid: user.uid,
              profileImage: imageUrl,
            })
            .catch(error => console.log(error))

          dispatch(createUserSuccess())
          dispatch(loginUserRequest())
          dispatch(loginUserSuccess(user))
        })
        .catch(error => dispatch(loginUserFailure(error)))
    }
    catch(error) {
      dispatch(createUserFailure(error))
    }
  }
}