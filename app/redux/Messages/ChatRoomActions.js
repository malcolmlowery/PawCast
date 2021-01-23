import uuid from "react-uuid";
import { fireStore, fireAuth } from "../../firebase/firebase";

const GET_CHAT_REQUEST = 'GET_CHAT_REQUEST';
const GET_CHAT_SUCCESS = 'GET_CHAT_SUCCESS';
const GET_CHAT_FAILURE = 'GET_CHAT_FAILURE';

const getChatRequest = () => ({
  type: GET_CHAT_REQUEST
});

const getChatSuccess = (data) => ({
  type: GET_CHAT_SUCCESS,
  payload: data
});

const getChatFailure = () => ({
  type: GET_CHAT_FAILURE
});

// New Chat Room
const CREATE_CHATROOM_REQUEST = 'CREATE_CHATROOM_REQUEST';
const CREATE_CHATROOM_SUCCESS = 'CREATE_CHATROOM_SUCCESS';
const CREATE_CHATROOM_FAILURE = 'CREATE_CHATROOM_FAILURE';

const createChatRoomRequest = () => ({
  type: CREATE_CHATROOM_REQUEST
});

const createChatRoomSuccess = () => ({
  type: CREATE_CHATROOM_SUCCESS
});

const createChatRoomFailure = () => ({
  type: CREATE_CHATROOM_FAILURE
});


export const getChatMessageRoom = (profileUID) => {
  return async (dispatch) => {
    dispatch(getChatRequest())
    
    const currentUID = fireAuth.currentUser.uid;

    fireStore
      .collection(`messages`)
      .where('members', 'array-contains', currentUID)
      .get()
      .then(snapshot => {

        snapshot.forEach(doc => {
          doc.data().members.find(user => {
            if(user == profileUID) {
              const chatroomId = doc.data().chatroomId
              return dispatch(getChatSuccess(chatroomId))
            }
          })
        })
        
      })

  }
};

const CREATE_CHAT_REQUEST = 'CREATE_CHAT_REQUEST';
const CREATE_CHAT_SUCCESS = 'CREATE_CHAT_SUCCESS';
const CREATE_CHAT_FAILURE = 'CREATE_CHAT_FAILURE';

const createChatRequest = () => ({
  type: CREATE_CHAT_REQUEST
});

const createChatSuccess = () => ({
  type: CREATE_CHAT_SUCCESS
});

const createChatFailure = () => ({
  type: CREATE_CHAT_FAILURE
});

export const createChatMessage = (otherUserId, text, chatroomId) => {
    return async (dispatch) => {
      dispatch(createChatRequest())
      const currentUserId = await fireAuth.currentUser.uid;

      if(chatroomId === null) {
        const newChatroomId = fireStore.collection('messages').doc().id;

        const currentUserData = await fireStore.collection('users')
        .doc(fireAuth.currentUser.uid)
        .get()
        .then(snapshot => snapshot.data());

        const otherUserData = await fireStore.collection('users')
          .doc(otherUserId)
          .get()
          .then(snapshot => snapshot.data());

        await fireStore
          .collection('messages')
          .doc(newChatroomId)
          .set({
            chatroomId: newChatroomId,
            member_uids: {
              memberOne: fireAuth.currentUser.uid,
              memberTwo: otherUserId
            },
            members: [
              fireAuth.currentUser.uid,
              otherUserId,
            ],
            userInfo: [
              currentUserData,
              otherUserData,
            ]
          })
          .then(() => {
            console.log('New Chatroom')
            dispatch(createChatRoomSuccess())
          })
          .catch(error => {
            console.log(error)
            dispatch(createChatRoomFailure(error))
          })

        await fireStore
          .collection('messages')
          .where('member_uids.memberOne', '==', currentUserId)
          .where('member_uids.memberTwo', '==', otherUserId)
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => 
              doc
                .ref
                .collection('chatroom')
                .doc()
                .set({
                  _id: uuid(), 
                  text,
                  createdAt: Date.now(), 
                  user: { 
                    avatar: fireAuth.currentUser.photoURL, 
                    name: fireAuth.currentUser.displayName, 
                    _id: fireAuth.currentUser.uid 
                  }
                })
            )
          })
      } 

      fireStore
        .collection('messages')
        .where('chatroomId', '==', chatroomId)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => 
            doc
              .ref
              .collection('chatroom')
              .doc()
              .set({
                _id: uuid(), 
                text,
                createdAt: Date.now(), 
                user: { 
                  avatar: fireAuth.currentUser.photoURL, 
                  name: fireAuth.currentUser.displayName, 
                  _id: fireAuth.currentUser.uid 
                }
              })
          )
        })
        .catch(error => {
          console.log(error)
          dispatch(createChatFailure(error))
        })
    }
};















// export const createNewChatroom = () => {
//   return async (dispatch) => {
//     dispatch(createChatRoomRequest())

//     const newChatroomId = fireStore.collection('messages').doc().id;

//     fireStore
//       .collection('messages')
//       .doc(newChatroomId)
//       .set({
//         chatroomId: newChatroomId
//       })
//       .then(() => {
//         console.log('New Chatroom')
//         dispatch(createChatRoomSuccess())
//       })
//       .catch(error => {
//         console.log(error)
//         dispatch(createChatRoomFailure(error))
//       })
//   }
// };




const getUser = (profileUID) => {
  return async (dispatch) => {
    // we have profile uid
    // we have current uid
    // get messages collection where current uid - Array
    // if array contains current uid and profile uid - return with session id
    // then get message collection/chatroom with session id
    
    const currentUID = fireAuth.currentUser.uid;

    fireStore
      .collection(`messages`)
      .where('members', 'array-contains', currentUID)
      .get()
      .then(snapshot => {

        snapshot.forEach(doc => {
          doc.data().members.find(user => {
            if(user == profileUID) {
              console.log(doc.data())
              return doc.data()
            }
          })
        })
        
      })
  }
}