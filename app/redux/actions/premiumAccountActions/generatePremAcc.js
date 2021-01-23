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

    const user = fireAuth.currentUser;
    
    const userLocation = await fireStore
      .collection('user_locations')
      .where('uid', '==', user.uid)
      .get()
      .then(snapshot => {
        return snapshot.docs.map(s => s.data())
      })
      .catch((error) => console.log(error))
console.log(userLocation[0])
    await fireStore
      .collection('premium_users')
      .doc(user.uid)
      .set({
        uid: user.uid,
        displayName: user.displayName,
        profileImage: user.photoURL,
        premium_user: true,
        city: userLocation[0].city,
        state: userLocation[0].state,
        lat: userLocation[0].lat,
        lng: userLocation[0].lng,
        verified: true,
        specialty
      })
      .then(() => {
        const premium_user = true;
        dispatch(upgradeUserSuccess(premium_user))
      })
      .catch(error => console.log(error))
  }
}