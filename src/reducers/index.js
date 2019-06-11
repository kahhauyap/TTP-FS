import { combineReducers } from 'redux';
import { user, currentUser, loginFail, registerFail } from './user';
import { portfolio, balance, store } from './portfolio';
import { transactions, currentTransaction } from './transactions';

export default combineReducers({
    user,
    currentUser,
    loginFail,
    registerFail,
    portfolio,
    balance,
    store,
    transactions,
    currentTransaction
})