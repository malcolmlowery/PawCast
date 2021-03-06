import { fireAuth, fireStore } from '../../firebase/firebase';
import {
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
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

      const hidden_post_ids = await fireStore
        .collection('hidden_posts')
        .doc(fireAuth.currentUser.uid)
        .get()
        .then(snapshot => {
          return snapshot.data()?.hidden_posts
        })

      const postsData = await fireStore
        .collection('posts')
        .orderBy('createdAt', 'desc')
        .get()
        .then(snapshot => {
          const posts = [];
          snapshot.forEach(doc => posts.push(doc.data()));
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

      const postWithComments = postsData.map(post => {

        const comments = []
        const comment = commentsData.map(comment => {
          if(post.postId === comment.postId) {
            return comments.push(comment)
          }
          return {}
        })

        if(postsData.postId === comments.postId && fireAuth.currentUser.uid === post.postOwner.uid) {
          return {
            ...post,
            comments,
            commentMode: false,
            editPost: false,
            showOptions: false,
          }
        }

        return {
          ...post,
          comments,
          commentMode: false,
        }
        
      })
      
      dispatch(getPostSuccess({
        postWithComments,
        hidden_post_ids,
      }))
  
    }
    catch(error) {
      dispatch(getPostFailure(error))
    }
  }
}

export const addCommentRequest = () => ({
  type: ADD_COMMENT_REQUEST,
});
// export const addCommentSuccess = (data) => ({
//   type: ADD_COMMENT_SUCCESS,
//   payload: data
// });
export const addCommentFailure = () => ({
  type: ADD_COMMENT_FAILURE,
});

export const addCommentToPost = (commentData) => {
  // console.log(commentData)
  return async (dispatch) => {
    const commentId = fireStore.collection('comments').doc().id;
    const { displayName, photoURL, uid } = fireAuth.currentUser;
    const { postId, comment } = commentData;
    try {
      dispatch(addCommentRequest())

      await fireStore.collection('comments').add({
        commentId,
        comment,
        postId,
        commentOwner: {
          profileImage: photoURL,
          name: displayName,
          uid: uid
        }
      })
      .then(() => {
        dispatch({
          type: ADD_COMMENT_SUCCESS,
          payload: {
            commentId,
            comment,
            postId,
            commentOwner: {
              profileImage: photoURL,
              name: displayName,
              uid: uid
            }
          }
        })
      })
    }
    catch(error) {
      console.log(error)
    }
  }
}

