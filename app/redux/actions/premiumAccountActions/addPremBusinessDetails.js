import { fireAuth, fireStore } from '../../../firebase/firebase';

const ADD_BUSINESS_DETAILS_REQUEST = 'ADD_BUSINESS_DETAILS_REQUEST';
const ADD_BUSINESS_DETAILS_SUCCESS = 'ADD_BUSINESS_DETAILS_SUCCESS';
const ADD_BUSINESS_DETAILS_FAILURE = 'ADD_BUSINESS_DETAILS_FAILURE';

const addBusinessDetailsRequest = () => ({
  type: ADD_BUSINESS_DETAILS_REQUEST
});

const addBusinessDetailsSuccess = (data) => ({
  type: ADD_BUSINESS_DETAILS_SUCCESS,
  payload: data
});

const addBusinessDetailsFailure = () => ({
  type: ADD_BUSINESS_DETAILS_FAILURE
});

export const addBusinessDetails = (userInput) => {

  return async (dispatch) => {
    dispatch(addBusinessDetailsRequest())

    fireStore
      .collection('premium_users')
      .doc(fireAuth.currentUser.uid)
      .update({
        details: {
          ...userInput
        }
      })
      .then(() => dispatch(addBusinessDetailsSuccess({userInput})))
      .catch(error => dispatch(addBusinessDetailsFailure(error)))
    
  }
};