import { fireStore } from "../../../firebase/firebase";

const GET_PREMIUM_POSTS_REQUEST = 'GET_PREMIUM_POSTS_REQUEST';
const GET_PREMIUM_POSTS_SUCCESS = 'GET_PREMIUM_POSTS_SUCCESS';
const GET_PREMIUM_POSTS_FAILURE = 'GET_PREMIUM_POSTS_FAILURE';

const getPremiumPostsRequest = () => ({
  type: GET_PREMIUM_POSTS_REQUEST
});
const getPremiumPostsSuccess = (data) => ({
  type: GET_PREMIUM_POSTS_SUCCESS,
  payload: data,
});
const getPremiumPostsFailure= () => ({
  type: GET_PREMIUM_POSTS_FAILURE
});

export const getPremiumPosts = () => {
  return async (dispatch) => {
    dispatch(getPremiumPostsRequest())

    await fireStore
      .collection('premium_posts')
      .orderBy('createdAt', 'desc')
      .get()
      .then(snapshot => {
        const data = [];
        snapshot.forEach(doc => data.push(doc.data()));
        return dispatch(getPremiumPostsSuccess(data));
      })
      .catch(error => dispatch(getPremiumPostsFailure(error)))
  }
};

const GET_FILTERED_POSTS_REQUEST = 'GET_FILTERED_POSTS_REQUEST';
const GET_FILTERED_POSTS_SUCCESS = 'GET_FILTERED_POSTS_SUCCESS';
const GET_FILTERED_POSTS_FAILURE = 'GET_FILTERED_POSTS_FAILURE';

const getFilteredPostsRequest = () => ({
  type: GET_FILTERED_POSTS_REQUEST
});
const getFilteredPostsSuccess = (data) => ({
  type: GET_FILTERED_POSTS_SUCCESS,
  payload: data,
});
const getFilteredPostsFailure = () => ({
  type: GET_FILTERED_POSTS_FAILURE
});

export const filterByType = (type) => {
  return async (dispatch) => {
    dispatch(getFilteredPostsRequest())
    if(type === null) {
      console.log(type)
      fireStore.collection('premium_posts')
      .orderBy('createdAt', 'desc')
      .get()
      .then(snapshot => {
        const data = [];
        snapshot.forEach(doc => data.push(doc.data()));
        return dispatch(getPremiumPostsSuccess(data));
      })
      .catch(error => dispatch(getFilteredPostsFailure(error)))
    }
    if(type !== null) {
      await fireStore
    .collection('premium_posts')
    .where('postOwner.specialty', '==', type)
    .get()
    .then(snapshot => {
      const data = [];
      snapshot.forEach(doc => data.push(doc.data()));
      console.log(data)
      return dispatch(getFilteredPostsSuccess(data));
    })
    .catch(error => dispatch(getFilteredPostsFailure(error)))
    }
  }
};