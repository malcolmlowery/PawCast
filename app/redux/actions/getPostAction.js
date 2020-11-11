import { fireStore } from '../../firebase/firebase';
import {
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
} from './Types';

export const getPostRequest = () => ({
  type: GET_POST_REQUEST
});

export const getPostSuccess = (data) => ({
  type: GET_POST_SUCCESS,
  payload: data
});

export const getPostFailure = () => ({
  type: GET_POST_FAILURE
});

export const fetchPosts = () => {
  return async (dispatch) => {
    try {
      dispatch(getPostRequest())

      fireStore
        .collection('posts')
        .get()
        .then(snapshot => {
          const posts = [];
          const comments = [];
          snapshot.forEach(doc => posts.push(doc.data()))
          dispatch(getPostSuccess({
            posts: posts
          }))
        })
    }
    catch(error) {
      dispatch(getPostFailure(error))
    }
  }
}