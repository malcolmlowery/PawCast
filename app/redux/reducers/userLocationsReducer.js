import {
  USER_LOCATIONS_REQUEST,
  USER_LOCATIONS_SUCCESS,
  USER_LOCATIONS_FAILURE,
} from '../actions/Types';

const intialState = {
  isLoading: null,
  data: [],
  error: null
};

export const userLocationsReducer = (state = intialState, action) => {
  switch(action.type) {
    case USER_LOCATIONS_REQUEST: return {
      ...state,
      isLoading: true
    }
    case USER_LOCATIONS_SUCCESS: return {
      ...state,
      isLoading: false,
      data: action.payload,
      error: false,
    }
    case USER_LOCATIONS_FAILURE: return {
      ...state,
      isLoading: false,
      error: true,
    }
    default: return state
  }
}