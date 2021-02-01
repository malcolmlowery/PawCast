const intialState = {
    pleaseWait: null
}

export const addBusinessReducer = (state = intialState, action) => {
    switch(action.type) {
        case 'ADD_BUSINESS_DETAILS_REQUEST': return {
            ...state,
            pleaseWait: true
        }
        case 'ADD_BUSINESS_DETAILS_SUCCESS': return {
            ...state,
            pleaseWait: false
        }
        case 'ADD_BUSINESS_DETAILS_FAILURE': return {
            ...state,
            pleaseWait: false
        }
        default: return state
    }
}