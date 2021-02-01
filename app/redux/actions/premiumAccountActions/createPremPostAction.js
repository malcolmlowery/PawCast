import { fireAuth, fireStore, fireStorage, firebase } from "../../../firebase/firebase";
import uuid from 'react-uuid';

const CREATE_PREMIUM_POST_REQUEST = 'CREATE_PREMIUM_POST_REQUEST';
const CREATE_PREMIUM_POST_SUCCESS = 'CREATE_PREMIUM_POST_SUCCESS';
const CREATE_PREMIUM_POST_FAILURE = 'CREATE_PREMIUM_POST_FAILURE';

const createPremiumPostRequest = () => ({
  type: CREATE_PREMIUM_POST_REQUEST
});

const createPremiumPostSuccess = (data) => ({
  type: CREATE_PREMIUM_POST_SUCCESS,
  payload: data
});

const createPremiumPostFailure = () => ({
  type: CREATE_PREMIUM_POST_FAILURE
});

export const createPremiumPost = (userInput) => {
  return async (dispatch) => {
    dispatch(createPremiumPostRequest())
    
    const { description, image } = userInput;

    const user = fireAuth.currentUser;
    const timestamp = firebase.firestore.Timestamp.now();

    const userData = await fireStore
      .collection('premium_users')
      .where('uid', '==', user.uid)
      .get()
      .then(snapshot => {
        return snapshot.docs.map(doc => doc.data())
      })

    const { 
      details,
      specialty,
      verified
    } = userData[0];
    
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

      if(image !== null) {
         await fireStore
        .collection('premium_posts')
        .doc()
        .set({
          createdAt: timestamp,
          displayName: user.displayName,
          dogType: 'Doberman',
          desc: description,
          postImages: [
            urlOfImage
          ],
          postOwner: {
            location: {
              city: details.city,
              state: details.state,
            },
            verified,
            profileImage: user.photoURL,
            uid: user.uid,
            specialty,
          }
        })

          return dispatch(createPremiumPostSuccess({
            displayName: user.displayName,
            dogType: 'Doberman',
            desc: description,
            postImages: [
              urlOfImage
            ],
            postOwner: {
              location: {
                city: details.city,
                state: details.state
              },
              verified,
              profileImage: user.photoURL,
              uid: user.uid,
              specialty,
            }
          }))
      }
    }

    if(image == null && userData !== undefined) {
      console.log('1')
      await fireStore
      .collection('premium_posts')
      .doc()
      .set({
        createdAt: timestamp,
        displayName: user.displayName,
        dogType: 'Doberman',
        desc: description,
        postImages: [],
        postOwner: {
          location: {
            city: details.city,
            state: details.state,
          },
          verified,
          profileImage: user.photoURL,
          uid: user.uid,
          specialty,
        }
      })
      
        return dispatch(createPremiumPostSuccess({
          displayName: user.displayName,
          dogType: 'Doberman',
          desc: description,
          postImages: [],
          postOwner: {
            location: {
              city: details.city,
              state: details.state,
            },
            verified,
            profileImage: user.photoURL,
            uid: user.uid,
            specialty,
          }
        }))
        
    }
  }
}