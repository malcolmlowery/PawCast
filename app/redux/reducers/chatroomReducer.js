const GET_CHAT_REQUEST = 'GET_CHAT_REQUEST';
const GET_CHAT_SUCCESS = 'GET_CHAT_SUCCESS';
const GET_CHAT_FAILURE = 'GET_CHAT_FAILURE';
const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';
const CREATE_MESSAGE_SUCCESS = 'CREATE_MESSAGE_SUCCESS';

const initialState = {
  chatroomID: null
};

export const chatroomReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_CHAT_SUCCESS: return {
      ...state,
      chatroomID: action.payload
    }
    case 'POP_SESSION_ID': {
      console.log(state.chatroomID)
      return {
        ...state,
        chatroomID: null,
      }
    }
    default: return state
  }
};