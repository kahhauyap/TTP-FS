import { UPDATE_EMAIL, UPDATE_PASSWORD } from '../actions'

// User reducer to update email and password
const user = (state = {
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

export default user;
