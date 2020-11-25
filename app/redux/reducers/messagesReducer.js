const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';

const initialState = {
  data: []
};

export const messagesReducer = (state = initialState, action) => {
  switch(action.type) {
    // case SEND_MESSAGE_SUCCESS: {
    //   return {
    //     ...state,
    //     data: action.payload
    //   }
    // }
    case 'GET_MESSAGES_SUCCESS': return {
      ...state,
      data: action.payload
    }
    default: return state
  }
};