const HIDE_POST_REQUEST = 'HIDE_POST_REQUEST';
const HIDE_POST_SUCCESS = 'HIDE_POST_SUCCESS';
const HIDE_POST_FAILURE = 'HIDE_POST_FAILURE';

const initialState = {
  hidden_posts: []
};

export const hidePostReducer = (state = initialState, action) => {
  switch(action.type) {
    case HIDE_POST_REQUEST: return {

    }
    case HIDE_POST_SUCCESS: return {
      ...state,
      hidden_posts: state.hidden_posts.concat(action.payload)
    }
    case HIDE_POST_FAILURE: return {

    }
    default: return state
  }
}