import { fireAuth, fireStorage, fireStore } from '../../firebase/firebase';
import uuid from 'react-uuid';
import {
  CREATE_DOG_REQUEST,
  CREATE_DOG_SUCCESS,
  CREATE_DOG_FAILURE,
  DELETE_DOG_REQUEST,
  DELETE_DOG_SUCCESS,
  DELETE_DOG_FAILURE,
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
        
          console.log('Created Dog!!!')
          return dispatch(createDogSuccess({
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
          }))
    }
    catch(error) {
      console.log(error)
    }
  }
}

const deleteDogRequest = () => ({
  type: DELETE_DOG_REQUEST
});

const deleteDogSuccess = (data) => ({
  type: DELETE_DOG_SUCCESS,
  payload: data
});

const deleteDogFailure = () => ({
  type: DELETE_DOG_FAILURE
});

export const deleteDog = (dogId) => {
  return async (dispatch) => {
    try {
      dispatch(deleteDogRequest())
      
      await fireStore.collection('animals')
        .where('dogId', '==', dogId)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            doc.ref.delete()
            console.log('Dog deleted successfully!')
            dispatch(deleteDogSuccess(dogId))
          })
        })

      await fireStore.collection('premium_pets')
      .where('dogId', '==', dogId)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          doc.ref.delete()
          console.log('Dog deleted successfully!')
          dispatch(deleteDogSuccess(dogId))
        })
      })
    }
    catch(error) {
      console.log(error)
    }
  }
}
