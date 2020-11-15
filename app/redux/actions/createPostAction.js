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
      console.log(timestamp)
      const imageBlob = await fetch(image).then(response => response.blob());
      const uid = await fireAuth.currentUser.uid
      const postId = await fireStore.collection('posts').doc().id;
      const timestamp = firebase.firestore.Timestamp.now();
      const userInfo = fireAuth.currentUser;

      const urlOfImage = await fireStorage
        .ref()
        .child(`image-${uuid()}.jpg`)
        .put(imageBlob)
        .then(snapshot => {
          return snapshot.ref.getDownloadURL().then(url => url)
        })
        .catch(error => console.log(error))

      await fireStore
        .collection('posts')
        .add({
          description,
          createdAt: timestamp,
          imageUrl: urlOfImage,
          postId,
          likes: 0,
          postOwner: {
            uid,
            name: userInfo.displayName,
            profileImage: userInfo.photoURL,
          },
        })
        .then(async (snapshot) => {
          const createdPost = await snapshot.get().then(doc => doc.data())
          dispatch(createPostSuccess(createdPost))
        })
        .catch(error => console.log(error))
    }
    catch(error) {
      dispatch(createPostFailure(error))
    }
  }
}