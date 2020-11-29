const GET_DOBERMANN_COUNT_REQUEST = 'GET_DOBERMANN_COUNT_REQUEST';
const GET_DOBERMANN_COUNT_SUCCESS = 'GET_DOBERMANN_COUNT_SUCCESS';
const GET_DOBERMANN_COUNT_FAILURE = 'GET_DOBERMANN_COUNT_FAILURE';

const initialState = {
  isLoading: false,
  error: null,
  total: 0
};

export const dobermannCounterReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_DOBERMANN_COUNT_REQUEST: {
      console.log('loading')
      return {
        ...state,
        isloading: true
      }
    }
    case GET_DOBERMANN_COUNT_SUCCESS: {
      console.log(action.payload)
      return {
        ...state,
        isLoading: false,
        total: action.payload
      }
    }
    case GET_DOBERMANN_COUNT_FAILURE: return {
      ...state,
      error: action.payload,
      isLoading: false
    }
    default: return state
  }
};