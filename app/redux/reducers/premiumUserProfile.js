const initialState = {
  isLoading: false,
  user: {
    details: {}
  },
  pets: [],
  posts: [],
  error: null,
  isCreating: false,
};

const GET_PREMIUM_PROFILE_REQUEST = 'GET_PREMIUM_PROFILE_REQUEST';
const GET_PREMIUM_PROFILE_SUCCESS = 'GET_PREMIUM_PROFILE_SUCCESS';
const GET_PREMIUM_PROFILE_FAILURE = 'GET_PREMIUM_PROFILE_FAILURE';

export const premiumUserProfile = (state = initialState, action) => {
  switch(action.type) {
    case GET_PREMIUM_PROFILE_REQUEST: return {
      ...state,
      isLoading: true
    }
    case GET_PREMIUM_PROFILE_SUCCESS: {
      const { petsData, postData, userData } = action.payload;
      return {
        ...state,
        isLoading: false,
        posts: postData,
        pets: petsData,
        user: userData[0]
      }
    }
    case 'ADD_BUSINESS_DETAILS_SUCCESS': {
      console.log(action.payload)
      return {
        ...state,
        user: {
          ...state.user,
          details: action.payload.userInput
        }
      }
    }
    case GET_PREMIUM_PROFILE_FAILURE: return {
      ...state,
      isLoading: false,
      error: action.payload
    }
    case 'CREATE_PREMDOG_SUCCESS': {
      const { petsData } = action.payload;
        return {
        ...state,
        isCreating: false,
        pets: [action.payload].concat(state.pets)
      }
    }
    case 'CREATE_PREMDOG_REQUEST': return {
      ...state,
      isCreating: true
    }
    case 'CREATE_PREMDOG_FAILURE': return {
      ...state,
      isCreating: false,
      error: action.payload
    }
    case 'DELETE_DOG_SUCCESS': return {
      ...state,
      pets: state.pets.filter(pet => pet.dogId !== action.payload)
    }
    default: return state
  }
}