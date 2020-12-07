const { fireStore, fireAuth, firebase } = require("../../firebase/firebase");

const REPORT_USER_REQUEST = 'REPORT_USER_REQUEST';
const REPORT_USER_SUCCESS = 'REPORT_USER_SUCCESS';
const REPORT_USER_FAILURE = 'REPORT_USER_FAILURE';

const BLOCK_USER_REQUEST = 'BLOCK_USER_REQUEST';
const BLOCK_USER_SUCCESS = 'BLOCK_USER_SUCCESS';
const BLOCK_USER_FAILURE = 'BLOCK_USER_FAILURE';

const BAN_USER_REQUEST = 'BAN_USER_REQUEST';
const BAN_USER_SUCCESS = 'BAN_USER_SUCCESS';
const BAN_USER_FAILURE = 'BAN_USER_FAILURE';

const REPORT_POST_REQUEST = 'REPORT_POST_REQUEST';
const REPORT_POST_SUCCESS = 'REPORT_POST_SUCCESS';
const REPORT_POST_FAILURE = 'REPORT_POST_FAILURE';

const HIDE_POST_REQUEST = 'HIDE_POST_REQUEST';
const HIDE_POST_SUCCESS = 'HIDE_POST_SUCCESS';
const HIDE_POST_FAILURE = 'HIDE_POST_FAILURE';

const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

const GET_REPORTED_REQUEST = 'GET_REPORTED_REQUEST';
const GET_REPORTED_SUCCESS = 'GET_REPORTED_SUCCESS';
const GET_REPORTED_FAILURE = 'GET_REPORTED_FAILURE';


const hidePostRequest = () => ({
  type: HIDE_POST_REQUEST
});
const hidePostSuccess = (postId) => ({
  type: HIDE_POST_SUCCESS,
  payload: postId,
});
const hidePostFailure = () => ({
  type: HIDE_POST_FAILURE
});

export const hidePost = (postId) => {
  return async (dispatch) => {
    try {
      dispatch(hidePostRequest())

      const uid = fireAuth.currentUser.uid;
      const has_hidden_posts = await fireStore
        .collection('hidden_posts')
        .where('uid', '==', uid)
        .get()
        .then(snapshot => snapshot.size)

      if(has_hidden_posts === 0) {
        await fireStore
          .collection('hidden_posts')
          .doc(uid)
          .set({
            uid: uid,
            hidden_posts: [postId]
          })
          .then(() => {
            return dispatch(hidePostSuccess(postId))
          })

      }

      await fireStore
        .collection('hidden_posts')
        .doc(fireAuth.currentUser.uid)
        .update({
          hidden_posts: firebase.firestore.FieldValue.arrayUnion(postId)
        })

      return dispatch(hidePostSuccess(postId))

    }
    catch(error) {
      console.log(error)
      dispatch(hidePostFailure(error))
    }
  }
}



const reportUserRequest = () => ({
  type: REPORT_USER_REQUEST
});
const reportUserSuccess = () => ({
  type: REPORT_USER_SUCCESS
});
const reportUserFailure = () => ({
  type: REPORT_USER_FAILURE
});

export const reportUser = (data) => {

  const {
    uid,
    postId,
    name,
    profileImage,
    imageUrl,
    description,
  } = data;

  return async (dispatch) => {
    dispatch(reportUserRequest())

    fireStore 
      .collection('reported_users')
      .doc()
      .set({
        uid,
        postId,
        name,
        profileImage,
        imageUrl,
        description,
      })
      .then(() => {
        dispatch(reportUserSuccess())
      })
      .catch(error => dispatch(reportUserFailure(error)))
  }
}


const getReportedRequest = () => ({
  type: GET_REPORTED_REQUEST
});
const getReportedSuccess = (data) => ({
  type: GET_REPORTED_SUCCESS,
  payload: data
});
const getReportedFailure = (error) => ({
  type: GET_REPORTED_FAILURE,
  payload: error
});

export const getReportedData = () => {
  return async (dispatch) => {
    dispatch(getReportedRequest())

    await fireStore
      .collection('reported_users')
      .get()
      .then(snapshot => {
        const posts = [];
        snapshot.forEach(doc => posts.push(doc.data()))
        console.log(posts)
        return dispatch(getReportedSuccess(posts))
      })
      .catch(error => dispatch(getReportedFailure(error)))
  }
}

const deletePostRequest = () => ({
  type: DELETE_POST_REQUEST
});
const deletePostSuccess = (postId) => ({
  type:  DELETE_POST_SUCCESS,
  payload: postId
});
const deletePostFailure = (error) => ({
  type:  DELETE_POST_FAILURE,
  payload: error
});

export const deleteReportedPost = (data) => {
  return async (dispatch) => {
    dispatch(deletePostRequest())
    if(fireAuth.currentUser.uid === 'g3HnPctmsnedxvFzAqPvpb64Dks1') {
      await fireStore
        .collection('posts')
        .where('postId', '==', data.postId)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => doc.ref.delete())
          dispatch(deletePostSuccess(data.postId))
        })
        .catch(error => dispatch(deletePostFailure(error)))

      await fireStore
        .collection('reported_users')
        .where('postId', '==', data.postId)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => doc.ref.delete())
          dispatch(deletePostSuccess(data.postId))
        })
        .catch(error => dispatch(deletePostFailure(error)))
    }
  }
}


const bannedUserRequest = () => ({
  type: BAN_USER_REQUEST
});
const bannedUserSuccess = (data) => ({
  type:  BAN_USER_REQUEST,
  payload: data
});
const bannedUserFailure = (error) => ({
  type:  BAN_USER_REQUEST,
  payload: error
});

export const banUser = (uid) => {
  return async (dispatch) => {
    dispatch(bannedUserRequest())

    const email = await fireStore
      .collection('users')
      .where('userId', '==', uid)
      .get()
      .then(snapshot => {
        let email;
        snapshot.forEach(doc => {
          email = doc.data().email
        })

      return email
      })

    await fireStore
      .collection('banned_users')
      .doc(uid)
      .set({ uid, email: email })
      .then(() => dispatch(bannedUserSuccess(uid)))
      .catch(error => dispatch(bannedUserFailure(error)))
  }
}