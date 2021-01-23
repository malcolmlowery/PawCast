const CREATE_PREMDOG_REQUEST = 'CREATE_PREMDOG_REQUEST';
const CREATE_PREMDOG_SUCCESS = 'CREATE_PREMDOG_SUCCESS';
const CREATE_PREMDOG_FAILURE = 'CREATE_PREMDOG_FAILURE';

const initialState = {
  isCreating: null,
  error: null,
  premium_pets: []
};

export const premiumPetsReducer = (state = initialState, action) => {
  switch(action.type) {
    case CREATE_PREMDOG_REQUEST: return {
      ...state,
      isCreating: true
    }
    case CREATE_PREMDOG_SUCCESS: return {
      ...state,
      isCreating: false,
      premium_pets: [action.payload].concat(state.premium_pets)
    }
    case CREATE_PREMDOG_FAILURE: return {
      ...state,
      isCreating: false,
      error: action.payload
    }
    default: return state
  }
}