import uuid from 'react-uuid'
import { 
  fireAuth, 
  fireStorage, 
  fireStore, 
  firebase, 
} from '../../firebase/firebase';
import {
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
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

export const createNewPost = (userInput) => {
  const { description, image } = userInput;

  return async (dispatch) => {
    try {
      dispatch(createPostRequest())
      const uid = await fireAuth.currentUser.uid
      const postId = await fireStore.collection('posts').doc().id;
      const timestamp = firebase.firestore.Timestamp.now();
      const userInfo = fireAuth.currentUser;
      
      if(image !== null) {
        const imageBlob = await fetch(image).then(response => response.blob());

        const urlOfImage = await fireStorage
        .ref()
        .child(`image-${uuid()}.jpg`)
        .put(imageBlob)
        .then(snapshot => {
          return snapshot.ref.getDownloadURL().then(url => url)
        })
        .catch(error => console.log(error))

        return await fireStore
          .collection('posts')
          .doc(postId)
          .set({
            description,
            createdAt: timestamp,
            imageUrl: urlOfImage,
            postId,
            likes: 0,
            likesByUsers: [],
            postOwner: {
              uid,
              name: userInfo.displayName,
              profileImage: userInfo.photoURL,
            },
          })
          .then(() => {
            dispatch(createPostSuccess({
              description,
              createdAt: timestamp.toDate().toString(),
              imageUrl: urlOfImage,
              likesByUsers: [],
              likedByCurrentUser: null,
              postId,
              likes: 0,
              postOwner: {
                uid,
                name: userInfo.displayName,
                profileImage: userInfo.photoURL,
              },
            }))
          })
          .catch(error => console.log(error))
      }


      await fireStore
          .collection('posts')
          .doc(postId)
          .set({
            description,
            createdAt: timestamp,
            imageUrl: '',
            postId,
            likes: 0,
            likesByUsers: [],
            postOwner: {
              uid,
              name: userInfo.displayName,
              profileImage: userInfo.photoURL,
            },
          })
          .then(() => {
            dispatch(createPostSuccess({
              description,
              createdAt: timestamp.toDate().toString(),
              imageUrl: '',
              likesByUsers: [],
              likedByCurrentUser: null,
              postId,
              likes: 0,
              postOwner: {
                uid,
                name: userInfo.displayName,
                profileImage: userInfo.photoURL,
              },
            }))
          })
          .catch(error => console.log(error))



  
    }
    catch(error) {
      dispatch(createPostFailure(error))
    }
  }
}

const updatePostRequest = () => ({
  type: UPDATE_POST_REQUEST,
});
const updatePostSuccess = (data) => ({
  type: UPDATE_POST_SUCCESS,
  payload: {
    description: data.description,
    postId: data.postId,
  },
});
const updatePostFailure = () => ({
  type: UPDATE_POST_FAILURE,
});

export const updatePost = (userInput) => {
  const { description, postId } = userInput;
  
  return async (dispatch) => {
    dispatch(updatePostRequest)
    
    fireStore
      .collection('posts')
      .doc(postId)
      .update({
        description
      })
      .then(() => dispatch(updatePostSuccess(userInput)))
      .catch(error => dispatch(updatePostFailure(error)))
  }
}


const deletePostRequest = () => ({
  type: DELETE_POST_REQUEST,
});
const deletePostSuccess = (data) => ({
  type: DELETE_POST_SUCCESS,
  payload: data,
});
const deletePostFailure = () => ({
  type: DELETE_POST_FAILURE,
});

export const deletePost = (postId) => {
  return async (dispatch) => {
    console.log(postId)
    dispatch(deletePostRequest())

    fireStore
    .collection('posts')
    .doc(postId)
    .delete()
    .then(() => dispatch(deletePostSuccess(postId)))
    .catch(error => dispatch(deletePostFailure(error)))
  }
};

const likePostRequest = () => ({
  type: LIKE_POST_REQUEST,
});
const likePostSuccess = (data) => ({
  type: LIKE_POST_SUCCESS,
  payload: data,
});
const likePostFailure = () => ({
  type: LIKE_POST_FAILURE,
});

export const likePost = (postId) => {
  return async (dispatch) => {
    dispatch(likePostRequest())

    await fireStore
      .collection('posts')
      .doc(postId)
      .get()
      .then(doc => doc.data().likesByUsers)
      .then(data => {
        const userId = fireAuth.currentUser.uid;
        const likedByUserId = data.find(user => user === userId)

        const currentUserId = fireAuth.currentUser.uid;
        if(likedByUserId === userId) {
          return fireStore
            .collection('posts')
            .doc(postId)
            .update({
              likes: firebase.firestore.FieldValue.increment(-1),
              likesByUsers: firebase.firestore.FieldValue.arrayRemove(fireAuth.currentUser.uid)
            })
            .then(() => dispatch(likePostSuccess({
              liked: 'UNLIKED', 
              postId,
              likedByCurrentUser: Boolean(data.find(userLike => userLike == currentUserId)),
            })))
        }
        if(likedByUserId !== userId) {
          return fireStore
            .collection('posts')
            .doc(postId)
            .update({
              likes: firebase.firestore.FieldValue.increment(1),
              likesByUsers: data.concat(userId)
            })
            .then(() => dispatch(likePostSuccess({
              liked: 'LIKED', postId, 
              likedByCurrentUser: firebase.firestore.FieldValue.arrayUnion(fireAuth.currentUser.uid)
            })))
        }
      })

  }
}