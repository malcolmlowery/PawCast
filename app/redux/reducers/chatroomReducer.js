const GET_CHAT_REQUEST = 'GET_CHAT_REQUEST';
const GET_CHAT_SUCCESS = 'GET_CHAT_SUCCESS';
const GET_CHAT_FAILURE = 'GET_CHAT_FAILURE';
const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';

const initialState = {
  messages: []
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
    default: return state
  }
};