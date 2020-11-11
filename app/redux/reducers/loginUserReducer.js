import AsyncStorage from '@react-native-community/async-storage';
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_FAILURE,
  VERIFY_SESSION_SUCCESS,
  VERIFY_SESSION_EXPIRED,
} from '../actions/Types';

const intialState = {
  authenticating: null,
  isAuthenticated: null,
  errors: null,
}

export const loginUserReducer = (state = intialState, action) => {
  switch(action.type) {
    case LOGIN_USER_REQUEST: return {
      ...state,
      authenticating: true,
    }
    case LOGIN_USER_SUCCESS: 
    case VERIFY_SESSION_SUCCESS: {
      return {
        ...state,
        authenticating: false,
        isAuthenticated: true,
      }
    }
    case LOGIN_USER_FAILURE: return {
      ...state,
      authenticating: false,
      isAuthenticated: false,
      errors: true,
    }
    case LOGOUT_USER_REQUEST: return {
      ...state,
      authenticating: true,
    }
    case LOGOUT_USER_SUCCESS: return {
      ...state,
      authenticating: false,
      isAuthenticated: false,
    }
    case LOGOUT_USER_FAILURE || VERIFY_SESSION_EXPIRED: return {
      ...state,
      user: {},
      authenticating: false,
      errors: true,
    }
    default: return state
  }
}
