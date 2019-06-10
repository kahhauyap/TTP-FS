import { combineReducers } from 'redux';
import { user, currentUser, loginFail } from './user';

export default combineReducers({
    user,
    currentUser,
    loginFail
})