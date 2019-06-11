import { FETCH_TRANSACTIONS, FETCH_TRANSACTIONS_SUCCESS, FETCH_TRANSACTIONS_FAIL, SET_CURRENT_TRANSACTION } from '../actions/transactionsActions';

const initialTransactionState = {
    transactions: [],
    isLoading: false
}

export const transactions = (state = initialTransactionState, action) => {
    switch (action.type) {
        case FETCH_TRANSACTIONS:
            return {
                ...state,
                isLoading: true
            }

        case FETCH_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                transactions: action.transactions,
                isLoading: false
            }

        case FETCH_TRANSACTIONS_FAIL:
            return {
                ...state,
                isLoading: false
            }

        default:
            return state;
    }
}

const initialTransaction = {
    symbol: '',
    shares: 0,
    date: '',
    price: 0
}

export const currentTransaction = (state = initialTransaction, action) => {
    switch (action.type) {
        case SET_CURRENT_TRANSACTION:
            return {
                ...state,
                symbol: action.symbol,
                shares: action.shares,
                date: action.date,
                price: action.price
            }
        default:
            return state;
    }
}