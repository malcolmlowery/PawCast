import { fireStore } from '../../firebase/firebase';

const GET_DOBERMANN_COUNT_REQUEST = 'GET_DOBERMANN_COUNT_REQUEST';
const GET_DOBERMANN_COUNT_SUCCESS = 'GET_DOBERMANN_COUNT_SUCCESS';
const GET_DOBERMANN_COUNT_FAILURE = 'GET_DOBERMANN_COUNT_FAILURE';

const getDobermannCountRequest = () => ({
  type: GET_DOBERMANN_COUNT_REQUEST
});

const getDobermannCountSuccess = (data) => ({
  type: GET_DOBERMANN_COUNT_SUCCESS,
  payload: data
});

const getDobermannCountFailure = () => ({
  type: GET_DOBERMANN_COUNT_FAILURE
});

export const getAllDobermannsByCount = () => {
  return async (dispatch) => {
    dispatch(getDobermannCountRequest())

    fireStore
      .collection('animals')
      .where('breed', '==', 'doberman')
      .get()
      .then(snapshot => {
        const total = snapshot.size;
        console.log(snapshot.size)
        return dispatch(getDobermannCountSuccess(total))
      })
      .catch(error => dispatch(getDobermannCountFailure(error)))
  }
}