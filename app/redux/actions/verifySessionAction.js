import { fireAuth, fireStore } from '../../firebase/firebase';
import {
  VERIFY_SESSION_REQUEST,
  VERIFY_SESSION_SUCCESS,
  VERIFY_SESSION_EXPIRED,
} from './Types';

const verifySessionRequest = () => ({
  type: VERIFY_SESSION_REQUEST
});

const verifySessionSuccess = () => ({
  type: VERIFY_SESSION_SUCCESS
});

const verifySessionExpired = () => ({
  type: VERIFY_SESSION_EXPIRED
});

export const verifyUserSession = () => {
  return async (dispatch) => {
    try {
      dispatch(verifySessionRequest())
      
      
      // const isBanned = await fireStore
      // .collection('banned_users')
      // .doc(fireAuth.currentUser.uid)
      // .get()
      // .then(snapshot => snapshot.data())
      // console.log(isBanned?.uid)

      // console.log(fireAuth.currentUser.uid)

      // if(fireAuth.currentUser.uid == null || isBanned?.uid === fireAuth.currentUser.uid) {
      //   fireAuth.signOut()
      //   return verifySessionExpired()
      // }
      
        fireAuth.onAuthStateChanged(user => {
          if(user !== null) {
            dispatch(verifySessionSuccess(user))
          } else {
            dispatch(verifySessionExpired())
          }
        })
    }
    catch(error) {
      return console.log(error)
    }
  }
}