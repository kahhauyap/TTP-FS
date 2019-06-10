import { combineReducers } from 'redux';
import { user, currentUser, loginFail, registerFail } from './user';

export default combineReducers({
    user,
    currentUser,
    loginFail,
    registerFail
})