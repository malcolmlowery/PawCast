const GET_CHAT_REQUEST = 'GET_CHAT_REQUEST';
const GET_CHAT_SUCCESS = 'GET_CHAT_SUCCESS';
const GET_CHAT_FAILURE = 'GET_CHAT_FAILURE';
const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';
const CREATE_MESSAGE_SUCCESS = 'CREATE_MESSAGE_SUCCESS';

const initialState = {
  messages: [],
  message_session_id: null
};

export const chatroomReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_CHAT_REQUEST: return {
      ...state,
      messages: []
    }
    case GET_CHAT_SUCCESS: return {
      ...state,
      messages: action.payload
    }
    case SEND_MESSAGE_SUCCESS: return {
      ...state,
      messages: [action.payload].concat(state.messages)
    }
    // case CREATE_MESSAGE_SUCCESS: return {
    //   ...state,
    //   message_session_id: action.payload
    // }
    default: return state
  }
};