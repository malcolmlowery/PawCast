import { fireAuth } from '../../firebase/firebase';
import {
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
  CREATE_POST_SUCCESS,
  CREATE_DOG_SUCCESS,
  DELETE_DOG_SUCCESS,
  LIKE_POST_SUCCESS,
  UPDATE_POST_SUCCESS,
  ADD_COMMENT_SUCCESS,
  DELETE_POST_SUCCESS,
} from '../actions/Types';

const intialState = {
  errors: null,
  isLoading: true,
  data: []
}

export const userProfileReducer = (state = intialState, action) => {
  switch(action.type) {
    case DELETE_POST_SUCCESS: return {
      ...state,
      data: state.data.filter(post => post.postId !== action.payload)
    }
    case 'GET_USER_REQUEST': return {
      ...state,
      isLoading: true,
    }
    case 'GET_USER_SUCCESS': {
      return {
        ...state,
        isLoading: false,
        data: action.payload.postWithComments,
        dogs: action.payload.dogs,
        profileImage: action.payload.profileImage,
        userInfo: action.payload.userInfo,
      }
    }
    case 'GET_USER_FAILURE': return {
      ...state,
      isLoading: false,
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
      console.log(action.payload)
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
    case CREATE_DOG_SUCCESS: return {
      ...state,
      dogs: state.dogs.concat(action.payload),
      dogCreated: true,
    }
    case DELETE_DOG_SUCCESS: return {
      ...state,
      dogs: state.dogs.filter(dog => dog.dogId !== action.payload)
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
    default: return state
  }
}