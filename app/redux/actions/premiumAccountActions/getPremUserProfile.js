import { fireAuth, fireStore } from '../../../firebase/firebase';

const GET_PREMIUM_PROFILE_REQUEST = 'GET_PREMIUM_PROFILE_REQUEST';
const GET_PREMIUM_PROFILE_SUCCESS = 'GET_PREMIUM_PROFILE_SUCCESS';
const GET_PREMIUM_PROFILE_FAILURE = 'GET_PREMIUM_PROFILE_FAILURE';

const getPremiumProfileRequest = () => ({
  type: GET_PREMIUM_PROFILE_REQUEST
});
const getPremiumProfileSuccess = (data) => ({
  type: GET_PREMIUM_PROFILE_SUCCESS,
  payload: data,
});
const getPremiumProfileFailure = (error) => ({
  type: GET_PREMIUM_PROFILE_FAILURE,
  payload: error
});

export const getPremiumUserProfile = (uid) => {
  return async (dispatch) => {
    dispatch(getPremiumProfileRequest())

    const postData = await fireStore
      .collection('premium_posts')
      .where('postOwner.uid', '==', uid)
      .get()
      .then(snapshot => {
        const data = [];
        snapshot.forEach(doc => data.push(doc.data()));
        return data;
      })
      .catch(error => dispatch(getPremiumProfileFailure(error)))

    const userData = await fireStore
      .collection('premium_users')
      .where('uid', '==', uid)
      .get()
      .then(snapshot => {
          return snapshot.docs.map(s => s.data())
      })
      .catch(error => dispatch(getPremiumProfileFailure(error)))
    
    const petsData = await fireStore
      .collection('premium_pets')
      .where('petOwner', '==', uid)
      .get()
      .then(snapshot => {
        const data = [];
        snapshot.forEach(doc => data.push(doc.data()));
        return data;
      })
      .catch(error => dispatch(getPremiumProfileFailure(error)))

    dispatch(getPremiumProfileSuccess({
      userData,
      postData,
      petsData,
    }))
  }
}