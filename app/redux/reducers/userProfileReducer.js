import {
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
  CREATE_POST_SUCCESS,
} from '../actions/Types';

const intialState = {
  errors: null,
  isLoading: true,
  data: []
}

export const userProfileReducer = (state = intialState, action) => {
  switch(action.type) {
    case 'GET_USER_REQUEST': return {

    }
    case 'GET_USER_SUCCESS': {
      return {
        ...state,
        data: action.payload.postWithComments,
        dogs: action.payload.dogs,
        profileImage: action.payload.profileImage
      }
    }
    case 'GET_USER_FAILURE': return {
      
    }
    case CREATE_POST_SUCCESS: {
      return {
        ...state,
        data: [{
          ...action.payload,
          comments: [],
          commentMode: false,
          editPost: false,
          showOptions: false,
        }].concat(state.data)
      }
    }

    case 'SHOW_OPTIONS_MODE': return {
      ...state,
      data: state.data.map(post => {
        if(post.postId === action.payload.postId && action.payload.showOptions == true) {
          return {
            ...post,
            editPost: false,
            showOptions: false,
          }
        }
        if(post.postId === action.payload.postId && action.payload.showOptions == false) {
          return {
            ...post,
            showOptions: true
          }
        }
        return post
      })
    }
    case 'EDIT_DESC_MODE': return {
      ...state,
      data: state.data.map(post => {
        if(post.postId === action.payload.postId && action.payload.editPost == true) {
          return {
            ...post,
            editPost: false
          }
        }
        if(post.postId === action.payload.postId && action.payload.editPost == false) {
          return {
            ...post,
            commentMode: false,
            editPost: true,
          }
        }
        return post
      })
    }
    case 'COMMENT_MODE': return {
      ...state,
      data: state.data.map(post => {
        if(post.postId === action.payload.postId && action.payload.commentMode == true) {
          return {
            ...post,
            commentMode: false
          }
        }
        if(post.postId === action.payload.postId && action.payload.commentMode == false) {
          return {
            ...post,
            commentMode: true,
            editPost: false,
            showOptions: false,
          }
        }
        return post
      })
    }
    default: return state
  }
}