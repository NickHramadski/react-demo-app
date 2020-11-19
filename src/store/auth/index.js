import * as actionTypes from './actions';

const initialState = {
    loggedIn: false,
    userEmail: null
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case(actionTypes.LOGIN):
            return {
                ...state,
                loggedIn: true,
                userEmail: action.payload
            };
        case(actionTypes.LOGOUT):
            return {
                ...state,
                loggedIn: false,
                userEmail: null
            }
        default:
            return state;
    }
}

export default reducer;
