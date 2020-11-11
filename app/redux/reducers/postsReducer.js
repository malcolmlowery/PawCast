import {
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
} from '../actions/Types';

const intialState = {
  posts: []
}

export const postReducer = (state = intialState, action) => {
  switch(action.type) {
    case GET_POST_REQUEST: return {

    }
    case GET_POST_SUCCESS: {
      const { posts } = action.payload;
      console.log(posts)
      return {
        ...state,
        posts: posts
      }
    }
    case GET_POST_FAILURE: return {
      
    }
    default: return state
  }
}