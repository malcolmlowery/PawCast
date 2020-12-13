import AsyncStorage from '@react-native-community/async-storage';
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_FAILURE,
  VERIFY_SESSION_REQUEST,
  VERIFY_SESSION_SUCCESS,
  VERIFY_SESSION_EXPIRED,
} from '../actions/Types';

const intialState = {
  bannedMessage: '',
  authenticating: null,
  isAuthenticated: null,
  user: [],
  errors: null,
}

export const loginUserReducer = (state = intialState, action) => {
  switch(action.type) {
    case LOGIN_USER_REQUEST:
      return {
      ...state,
      bannedMessage: '',
    }
    case 'LOGIN_USER_BANNED': return {
      ...state,
      authenticating: false,
      isAuthenticated: false,
      bannedMessage: action.payload.message
    }
    case VERIFY_SESSION_REQUEST: return {
      ...state,
      authenticating: true,
    }
    case LOGIN_USER_SUCCESS: 
    case VERIFY_SESSION_SUCCESS: {
      return {
        ...state,
        authenticating: false,
        isAuthenticated: true,
        user: action.payload
      }
    }
    case 'UPGRADE_USER_SUCCESS': return {
      ...state,
      user: {
        ...state.user,
        premium_user: action.payload
      }
    }
    case LOGIN_USER_FAILURE: return {
      ...state,
      authenticating: false,
      isAuthenticated: false,
      bannedMessage: '',
      errors: action.payload,
    }
    case LOGOUT_USER_REQUEST: return {
      ...state,
      authenticating: false,
    }
    case LOGOUT_USER_SUCCESS: return {
      ...state,
      authenticating: false,
      isAuthenticated: false,
      bannedMessage: '',
      errors: null,
    }
    case LOGOUT_USER_FAILURE:
    case VERIFY_SESSION_EXPIRED: return {
      ...state,
      user: {},
      authenticating: false,
      isAuthenticated: false,
      errors: action.payload,
    }
    default: return state
  }
}
