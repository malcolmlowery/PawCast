import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from '../actions/Types';

const intialState = {
  authenticating: null,
  isAuthenticated: null,
  user: {},
  errors: null,
}

export const loginUserReducer = (state = intialState, action) => {
  switch(action.type) {
    case LOGIN_USER_REQUEST: return {
      ...state,
      authenticating: true,
    }
    case LOGIN_USER_SUCCESS: return {
      ...state,
      authenticating: false,
      user: action.payload,
      isAuthenticated: true,
    }
    case LOGIN_USER_FAILURE: return {
      ...state,
      authenticating: false,
      isAuthenticated: false,
      errors: true,
    }
    default: return state
  }
}