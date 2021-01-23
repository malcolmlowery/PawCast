const initialState = {
  data: null
};

export const messagesReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_MESSAGES_SUCCESS': return {
      ...state,
      data: action.payload
    }
    default: return state
  }
};