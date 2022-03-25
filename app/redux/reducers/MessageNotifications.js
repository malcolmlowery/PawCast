const intialState = {
    viewingNewData: null,
    userProfileId: '',
};

export const newIncomingMessageReducer = (state = intialState, action) => {
    switch(action.type) {
        case 'NEW_MESSAGE_SUCCESS': {
            return {
                ...state,
                viewingNewData: action.payload.b,
                userProfileId: action.payload.a
            }
        }
        case 'REMOVE_NOTIFICATION': return {
            ...state,
            viewingNewData: null,
            userProfileId: ''
        }
        default: return state
    }
}