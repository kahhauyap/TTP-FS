import { UPDATE_EMAIL, UPDATE_PASSWORD, LOGIN_USER, SET_USER, LOGIN_FAIL, loginUser } from '../actions'

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

// Set the current User that is logged in
export const currentUser = (state = { user: '', isLoggedIn: false }, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, currentUser: { user: action.user, isLoggedIn: true } };
        default:
            return state;
    }
}

// Set the error message if login failed
export const loginFail = (state = '', action) => {
    switch (action.type) {
        case LOGIN_FAIL:
            return { ...state, loginError: action.error };
        default:
            return state;
    }
}

