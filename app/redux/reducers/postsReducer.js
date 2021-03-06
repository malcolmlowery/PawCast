import { fireAuth } from '../../firebase/firebase';
import {
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  DELETE_POST_SUCCESS,
  UPDATE_POST_SUCCESS,
  ADD_COMMENT_SUCCESS,
  LIKE_POST_SUCCESS,
} from '../actions/Types';

const HIDE_POST_REQUEST = 'HIDE_POST_REQUEST';
const HIDE_POST_SUCCESS = 'HIDE_POST_SUCCESS';
const HIDE_POST_FAILURE = 'HIDE_POST_FAILURE';

const intialState = {
  errors: null,
  isLoading: false,
  creatingPost: null,
  data: [],
  hidden_posts: [],
}

export const postReducer = (state = intialState, action) => {
  switch(action.type) {
    case GET_POST_REQUEST: return {
      ...state,
      isLoading: true,
    }
    case GET_POST_SUCCESS: {
      const { hidden_post_ids, postWithComments } = action.payload;
      
      
        const posts = postWithComments.filter(post => {
          if(hidden_post_ids != undefined) {
            return !hidden_post_ids.includes(post.postId)
          }
          return post
        })

      return {
        ...state,
        isLoading: false,
        data: posts
      }
    }
    case GET_POST_FAILURE: return {
      ...state,
      isLoading: false,
    }
    case CREATE_POST_REQUEST: return {
      ...state,
      creatingPost: true
    }
    case CREATE_POST_SUCCESS: {
      return {
        ...state,
        creatingPost: false,
        data: [{
          ...action.payload,
          comments: [],
          commentMode: false,
          editPost: false,
          showOptions: false,
        }].concat(state.data)
      }
    }
    case CREATE_POST_FAILURE: return {
      ...state,
      creatingPost: false,
      error: action.payload
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
    case DELETE_POST_SUCCESS: return {
      ...state,
      data: state.data.filter(post => post.postId !== action.payload)
    }
    case UPDATE_POST_SUCCESS: return {
      ...state,
      data: state.data.map(post => {
        if(post.postId === action.payload.postId) {
          return {
            ...post,
            description: action.payload.description,
            editPost: false,
            showOptions: false,
          }
        }
        return post
      })
    }
    case ADD_COMMENT_SUCCESS: {
      return {
        ...state,
        data: state.data.map(post => {
          if(post.postId === action.payload.postId) {
            return {
              ...post,
              comments: [action.payload].concat(post.comments),
              commentMode: false,
            }
          }
          return post
        })
      }
    }
    case LIKE_POST_SUCCESS: return {
      ...state,
      data: state.data.map(post => {
        const { liked, postId } = action.payload;

        if(liked == 'LIKED' && postId == post.postId) {
          return {
            ...post,
            likes: post.likes + 1,
            likedByCurrentUser: post.likesByUsers.concat(fireAuth.currentUser.uid)
          }
        }
        if(liked == 'UNLIKED' && postId == post.postId) {
          return {
            ...post,
            likes: post.likes - 1,
            likedByCurrentUser: post.likesByUsers.find(userId => userId === fireAuth.currentUser.uid)
          }
        }
        return post
      })
    }
    case 'SHOW_COMMENT_OPTIONS': return {
      ...state,

    }
    case HIDE_POST_REQUEST: return {
      ...state
    }
    case HIDE_POST_SUCCESS: {
      console.log(action.payload)
      return {
        ...state,
        data: state.data.filter(post => {
          if(post.postId === action.payload) {
            return 
          }

          return post
        })
      }
    }
    case HIDE_POST_FAILURE: return {
      ...state,
      errors: action.payload
    }
    default: return state
  }
}