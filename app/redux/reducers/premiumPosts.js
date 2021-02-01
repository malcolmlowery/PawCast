const intialState = {
  isLoading: false,
  creatingPremPost: false,
  posts: [],
  error: null,
};

const GET_PREMIUM_POSTS_REQUEST = 'GET_PREMIUM_POSTS_REQUEST';
const GET_PREMIUM_POSTS_SUCCESS = 'GET_PREMIUM_POSTS_SUCCESS';
const GET_PREMIUM_POSTS_FAILURE = 'GET_PREMIUM_POSTS_FAILURE';
const CREATE_PREMIUM_POST_SUCCESS = 'CREATE_PREMIUM_POST_SUCCESS';
const GET_FILTERED_POSTS_SUCCESS = 'GET_FILTERED_POSTS_SUCCESS';

export const premiumPostsReducer = (state = intialState, action) => {
  switch(action.type) {
    case GET_PREMIUM_POSTS_REQUEST: return {
      ...state,
      isLoading: true
    }
    case GET_PREMIUM_POSTS_SUCCESS: return {
      ...state,
      posts: action.payload,
      isLoading: false
    }
    case GET_PREMIUM_POSTS_FAILURE: return {
      ...state,
      isLoading: false,
      error: action.payload
    }
    case 'CREATE_PREMIUM_POST_REQUEST': return {
      ...state,
      creatingPremPost: true,
    }
    case 'CREATE_PREMIUM_POST_SUCCESS': {
      console.log(action.payload)
      return {
        ...state,
        creatingPremPost: false,
        posts: [action.payload].concat(state.posts)
      }
    }
    case GET_FILTERED_POSTS_SUCCESS: {
      console.log(action.payload)
      return {
        ...state,
        posts: action.payload
      }
    }
    default: return state
  }
};