import { fireAuth, fireStorage, fireStore } from '../../firebase/firebase';
import uuid from 'react-uuid';
import {
  CREATE_DOG_REQUEST,
  CREATE_DOG_SUCCESS,
  CREATE_DOG_FAILURE,
} from './Types';

const createDogRequest = () => ({
  type: CREATE_DOG_REQUEST
});

const createDogSuccess = (data) => ({
  type: CREATE_DOG_SUCCESS,
  payload: data
});

const createDogFailure = () => ({
  type: CREATE_DOG_FAILURE
});

export const createNewDog = (userInput) => {
  return async (dispatch) => {
    console.log(userInput)
    const {
      image,
      name,
      breed,
      breedLine,
      gender,
      age,
      color,
      earCrop,
      tailCrop,
      personality,
    } = userInput;

    try {
      dispatch(createDogRequest())

      const dogId = fireStore.collection('animals').doc().id;
      const userInfo = fireAuth.currentUser;

      const imageBlob = await fetch(image).then(res => res.blob());

      const imageUrl = await fireStorage
        .ref()
        .child(`animals/${breed}-${personality}-${uuid()}.jpg`)
        .put(imageBlob)
        .then(snapshot => {
          return snapshot.ref.getDownloadURL()
            .then(url => url)
        })
        .catch(error => {
          console.log(error)
          dispatch(createDogFailure())
        })

      await fireStore
        .collection('animals')
        .add({
          dogOwner: {
            uid: userInfo.uid,
            name: userInfo.displayName,
            profileImage: userInfo.photoURL
          },
          dogId,
          images: [imageUrl],
          name,
          breed,
          breedLine,
          gender,
          age,
          color,
          earCrop,
          tailCrop,
          personality,
        })
        .then((doc) => {
          console.log('Created Dog!!!')
          dispatch(createDogSuccess())
        })
        .catch(error => {
          console.log(error)
          dispatch(createDogFailure())
        })
    }
    catch(error) {
      console.log(error)
    }
  }
}