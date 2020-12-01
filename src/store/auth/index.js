import * as actionTypes from './actions';

const initialState = {
    loggedIn: false,
    userEmail: null,
    loginError: null
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case(actionTypes.LOGIN_SUCCESS):
            return {
                ...state,
                loggedIn: true,
                userEmail: action.payload,
                loginError: null
            };
        case(actionTypes.LOGIN_FAILED):
            return {
                ...state,
                loggedIn: false,
                loginError: action.payload
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
