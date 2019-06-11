import { UPDATE_EMAIL, UPDATE_PASSWORD, SET_USER, LOGIN_FAIL, REGISTER_FAIL, LOGOUT_USER } from '../actions';

// User reducer to update email and password
export const user = (state = {
    email: '',
    password: ''
}, action) => {
    switch (action.type) {
        case UPDATE_EMAIL:
            return { ...state, email: action.email }
        case UPDATE_PASSWORD:
            return { ...state, password: action.password };
        default:
            return state;
    }
}

const initialUserState = {
    currentUser: {
        user: null,
        isLoggedIn: false
    }
}

// Set the current User that is logged in
export const currentUser = (state = initialUserState, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, currentUser: { user: action.user, isLoggedIn: true } };
        case LOGOUT_USER:
            return { ...state, currentUser: { user: null, isLoggedIn: false } };
        default:
            return state;
    }
}

// Set the error message if login failed
export const loginFail = (state = '', action) => {
    switch (action.type) {
        case LOGIN_FAIL:
            return action.error;
        default:
            return state;
    }
}

export const registerFail = (state = '', action) => {
    switch (action.type) {
        case REGISTER_FAIL:
            return action.error;
        default:
            return state;
    }
}




