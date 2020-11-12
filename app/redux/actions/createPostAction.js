import { fireAuth, fireStore } from '../../firebase/firebase';
import {
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
} from './Types';

const createPostRequest = () => ({
  type: CREATE_POST_REQUEST
});

const createPostSuccess = (data) => ({
  type: CREATE_POST_SUCCESS,
  payload: data
});

const createPostFailure = () => ({
  type: CREATE_POST_FAILURE
});

export const createNewPost = () => {
  return async (dispatch) => {
    try {
      dispatch(createPostRequest())
      const uid = await fireAuth.currentUser.uid
      const postId = await fireStore.collection('posts').doc().id;
      await fireStore
        .collection('posts')
        .add({
          description: postId,
          postId,
          likes: 0,
          postOwner: {
            uid,
            name: 'name'
          },
        })
        .then(async (snapshot) => {
          const createdPost = await snapshot.get().then(doc => doc.data())
          dispatch(createPostSuccess(createdPost))
        })
    }
    catch(error) {
      dispatch(createPostFailure(error))
    }
  }
}