import { fireAuth, fireStore } from '../../firebase/firebase';
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

      const postsData = await fireStore
        .collection('posts')
        .orderBy('createdAt', 'desc')
        .get()
        .then(snapshot => {
          const posts = [];
          snapshot.forEach(doc => posts.push(doc.data()))
          return posts
        })

      const commentsData = await fireStore
        .collection('comments')
        .get()
        .then(snapshot => {
          const comments = [];
          snapshot.forEach(doc => comments.push(doc.data()))
          return comments
        })

      const posts = postsData.map(post => post)
      
      const postWithComments = posts.map(post => {
        const comments = []
        const comment = commentsData.map(comment =>{
          if(post.postId === comment.postId) {
            return comments.push(comment)
          }
          return {}
        })
        if(posts.postId === comments.postId) {
          return {
            ...post,
            comments,
            commentMode: false,
            editPost: false,
            showOptions: false,
          }
        }
      })

      dispatch(getPostSuccess(postWithComments))
  
    }
    catch(error) {
      dispatch(getPostFailure(error))
    }
  }
}