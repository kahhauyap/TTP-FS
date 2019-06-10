import axios from 'axios';

export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const LOGIN_USER = 'LOGIN_USER';
export const SET_USER = 'SET_USER';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const updateEmail = (email) => ({
    type: UPDATE_EMAIL,
    email
})

export const updatePassword = (password) => ({
    type: UPDATE_PASSWORD,
    password
})

export const userLogin = (email, password) => ({
    type: LOGIN_USER,
    email,
    password
})

const setCurrentUser = (email) => ({
    type: SET_USER,
    user: email
})

const loginFail = (error) => ({
    type: LOGIN_FAIL,
    error
})

// Post User credentials and then dispatch action to set user logged in if success, otherwise set error message states in store
export const loginUser = (email, password, history) => {
    return dispatch => {
        axios.post('/users/login', {
            email,
            password
        })
            .then(() => {
                dispatch(setCurrentUser(email));
                history.push('/portfolio');
            }).catch(error => {
                if (error.response.status === 404)
                    dispatch(loginFail('User not found'))
                else if (error.response.status === 400)
                    dispatch(loginFail('Incorrect credentials'))
            });
    }
}

export const REGISTER_FAIL = 'REGISTER_FAIL';
export const registerFail = (error) => ({
    type: REGISTER_FAIL,
    error
})

export const registerUser = (name, email, password, history) => {
    return dispatch => axios.post('/users/register', {
        name,
        email,
        password
    })
        .then(() => {
            history.push('/');
        }).catch(error => {
            if (error.response.status === 400)
                dispatch(registerFail('Email already in use'))
        });
}
