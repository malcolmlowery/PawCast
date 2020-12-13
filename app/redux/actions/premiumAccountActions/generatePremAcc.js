import { fireAuth, fireStore } from '../../../firebase/firebase';

const UPGRADE_USER_REQUEST = 'UPGRADE_USER_REQUEST';
const UPGRADE_USER_SUCCESS = 'UPGRADE_USER_SUCCESS';
const UPGRADE_USER_FAILURE = 'UPGRADE_USER_FAILURE';

const upgradeUserRequest = () => ({
  type: UPGRADE_USER_REQUEST
});
const upgradeUserSuccess = (data) => ({
  type: UPGRADE_USER_SUCCESS,
  payload: data,
});
const upgradeUserFailure = () => ({
  type: UPGRADE_USER_FAILURE
});

export const upgradeUserProfile = (specialty) => {
  return async (dispatch) => {
    dispatch(upgradeUserRequest())

    const uid = fireAuth.currentUser.uid;
    
    fireStore
      .collection('users')
      .doc(uid)
      .set({
        premium_user: true,
        specialty
      }, { merge: true })
      .then(() => {
        const premium_user = true;
        dispatch(upgradeUserSuccess(premium_user))
      })
      .catch(error => console.log(error))
  }
}