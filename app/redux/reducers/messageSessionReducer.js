const GET_MESSAGE_SESSION_REQUEST = 'GET_MESSAGE_SESSION_REQUEST';
const GET_MESSAGE_SESSION_SUCCESS = 'GET_MESSAGE_SESSION_SUCCESS';
const GET_MESSAGE_SESSION_FAILURE = 'GET_MESSAGE_SESSION_FAILURE';

const NEW_MESSAGE_REQUEST = 'NEW_MESSAGE_REQUEST';
const NEW_MESSAGE_SUCCESS = 'NEW_MESSAGE_SUCCESS';
const NEW_MESSAGE_FAILURE = 'NEW_MESSAGE_FAILURE';

const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';

const GET_MESSAGES_REQUEST = 'GET_MESSAGES_REQUEST';
const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';
const GET_MESSAGES_FAILURE = 'GET_MESSAGES_FAILURE';

const intialState = {
  session: null,
  chats: [],
  messages: [],
};

export const messageSessionReducer = (state = intialState, action) => {
  switch(action.type) {
    case NEW_MESSAGE_SUCCESS: return {
      ...state,
      session: action.payload
    }
    case SEND_MESSAGE_SUCCESS: return {
      ...state,
      session: action.payload
    }
    case GET_MESSAGE_SESSION_SUCCESS: {
      return {
        ...state,
        session: action.payload.message_session_id,
        chats: action.payload.chats
      }
    }
    case GET_MESSAGE_SESSION_REQUEST: {
      return {
        ...state,
        chats: []
      }
    }
    case GET_MESSAGE_SESSION_FAILURE: return {
      ...state,
      session: null
    }
    case GET_MESSAGES_SUCCESS: return {
      ...state,
      messages: action.payload,
    }
    default: return state
  }
};