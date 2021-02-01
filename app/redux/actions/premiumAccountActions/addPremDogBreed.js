import { fireStore, fireAuth, fireStorage } from '../../../firebase/firebase';
import uuid from 'react-uuid';

const CREATE_PREMDOG_REQUEST = 'CREATE_PREMDOG_REQUEST';
const CREATE_PREMDOG_SUCCESS = 'CREATE_PREMDOG_SUCCESS';
const CREATE_PREMDOG_FAILURE = 'CREATE_PREMDOG_FAILURE';

const createPremDogRequest = () => ({
  type: CREATE_PREMDOG_REQUEST
});

const createPremDogSuccess = (data) => ({
  type: CREATE_PREMDOG_SUCCESS,
  payload: data
});

const createPremDogFailure = (error) => ({
  type: CREATE_PREMDOG_FAILURE,
  payload: error
});

export const createPremiumPet = (userInput) => {
  return async (dispatch) => {
    dispatch(createPremDogRequest())

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
      shotsGiven,
      price,
    } = userInput;

    const user = fireAuth.currentUser;
    const imageBlob = await fetch(image).then(response => response.blob());
    const dogId = await fireStore.collection('premium_pets').doc().id;

    const urlOfImage = await fireStorage
    .ref()
    .child(`premium-pets/image-${uuid()}.jpg`)
    .put(imageBlob)
    .then(snapshot => {
      return snapshot.ref.getDownloadURL().then(url => url)
    })
    .catch(error => console.log(error))

    await fireStore
      .collection('premium_pets')
      .doc()
      .set({
        dogId,
        dogOwner: user.uid,
        image: [ urlOfImage ],
        name,
        breed,
        breedLine,
        gender,
        age,
        color,
        earCrop,
        tailCrop,
        personality,
        shotsGiven,
        price,
      })
      .then(() => {
        dispatch(createPremDogSuccess({
          dogId,
          dogOwner: user.uid,
          image: [ urlOfImage ],
          name,
          breed,
          breedLine,
          gender,
          age,
          color,
          earCrop,
          tailCrop,
          personality,
          shotsGiven,
          price,
        }))
      })
      .catch(error => dispatch(createPremDogFailure(error)))
  }
}