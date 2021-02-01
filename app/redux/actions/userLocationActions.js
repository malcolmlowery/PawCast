import { fireStore } from '../../firebase/firebase';
import {
  USER_LOCATIONS_REQUEST,
  USER_LOCATIONS_SUCCESS,
  USER_LOCATIONS_FAILURE,
} from './Types';

const userLocationsRequest = () => ({
  type: USER_LOCATIONS_REQUEST,
});

const userLocationsSuccess = (data) => ({
  type: USER_LOCATIONS_SUCCESS,
  payload: data,
});

const userLocationsFailure = () => ({
  type: USER_LOCATIONS_FAILURE,
});

export const getUserLocations = () => {
  return async (dispatch) => {
    dispatch(userLocationsRequest())
    try{
      const data = [];
      const premiumData = [];

      await fireStore
        .collection('user_locations')
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            data.push(doc.data())
          })
        });
      
      await fireStore
        .collection('premium_users')
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            premiumData.push(doc.data())
          })
        })

        console.log(data, premiumData)

      dispatch(userLocationsSuccess({data: data, premiumData: premiumData}))
    }
    catch(error) {
      dispatch(userLocationsFailure())
    }
  }
}