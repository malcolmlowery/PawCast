const GET_REPORTED_REQUEST = 'GET_REPORTED_REQUEST';
const GET_REPORTED_SUCCESS = 'GET_REPORTED_SUCCESS';
const GET_REPORTED_FAILURE = 'GET_REPORTED_FAILURE';
const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

const initialState = {
  isLaoding: null,
  error: null, 
  data: []
};

export const userReportingData = (state = initialState, action) => {
  switch(action.type) {
    case GET_REPORTED_REQUEST: return {
      ...state,
      isLoading: true
    }
    case GET_REPORTED_SUCCESS: {return {
      ...state,
      isLoading: false,
      data: action.payload
    }}
    case GET_REPORTED_FAILURE: return {
      ...state,
      isLoading: false,
      error: action.payload
    }
    case DELETE_POST_SUCCESS: return {
      ...state,
      data: state.data.filter(post => post.postId !== action.payload)
    }
    default: return state
  }
}