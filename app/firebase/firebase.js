import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const fbConfig = {
  apiKey: "AIzaSyCFTq_Tx-VOI2BWdxs-RnykGZ3Axnqj8FE",
  authDomain: "pawcast-app-6daf2.firebaseapp.com",
  databaseURL: "https://pawcast-app-6daf2.firebaseio.com",
  projectId: "pawcast-app-6daf2",
  storageBucket: "pawcast-app-6daf2.appspot.com",
  messagingSenderId: "680483867",
  appId: "1:680483867:web:52ef65a4aee1a97c0bacbe"
};

firebase.initializeApp(fbConfig);

const fireAuth = firebase.auth();
const fireStore = firebase.firestore();
const fireStorage = firebase.storage();

export { 
  fireAuth,
  fireStore,
  fireStorage,
  firebase,
};