import { combineReducers } from 'redux';
import { user, currentUser, loginFail, registerFail } from './user';
import { portfolio } from './portfolio'

export default combineReducers({
    user,
    currentUser,
    loginFail,
    registerFail,
    portfolio
})