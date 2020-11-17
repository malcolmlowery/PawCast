import { fireAuth, fireStore } from '../../firebase/firebase';
import {
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
} from './Types';

export const getUserPostRequest = () => ({
  type: 'GET_USER_REQUEST'
});

export const getUserPostSuccess = (data) => ({
  type: 'GET_USER_SUCCESS',
  payload: data
});

export const getUserPostFailure = () => ({
  type: 'GET_USER_FAILURE'
});

export const fetchUserPosts = () => {
  return async (dispatch) => {
    try {
      dispatch(getUserPostRequest())
      const uid = await fireAuth.currentUser.uid;
      const userInfo = await fireAuth.currentUser;
      
      const postsData = await fireStore
        .collection('posts')
        .where('postOwner.uid', '==', uid)
        // .orderBy('createdAt', 'desc')
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
      
      const dogsData = await fireStore
        .collection('animals')
        .where('dogOwner.uid', '==', uid)
        .get()
        .then(snapshot => {
          const dogs = [];
          snapshot.forEach(doc => dogs.push(doc.data()))
          return dogs
        })

      const userData = await fireStore
        .collection('users')
        .where('uid', '==', uid)
        .get()
        .then(snapshot => {
          const user = {};
          snapshot.forEach(doc => Object.assign(user, doc.data()))
          return user
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
      
      dispatch(getUserPostSuccess({
        postWithComments: postWithComments,
        dogs: dogsData,
        profileImage: userInfo.photoURL,
        userInfo: userData
      }))
    }
    catch(error) {
      console.log(getUserPostFailure(error))
      dispatch(getUserPostFailure(error))
    }
  }
}