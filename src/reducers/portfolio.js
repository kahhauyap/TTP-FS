import { FETCH_PORTFOLIO, FETCH_PORTFOLIO_SUCCESS, FETCH_PORTFOLIO_FAIL, SET_BALANCE, SET_MESSAGE } from '../actions/portfolioActions'

const initialState = {
    portfolio: [],
    total: 0,
    isLoading: false
}

export const portfolio = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PORTFOLIO:
            return { ...state, isLoading: true };
        case FETCH_PORTFOLIO_SUCCESS:
            return { ...state, portfolio: action.portfolio, total: action.total, isLoading: false }
        case FETCH_PORTFOLIO_FAIL:
            return state;
        default:
            return state;
    }
}

// Set the current User that is logged in
export const balance = (state = 0, action) => {
    switch (action.type) {
        case SET_BALANCE:
            return { ...state, balance: action.balance };
        default:
            return state;
    }
}

export const store = (state = '', action) => {
    switch (action.type) {
        case SET_MESSAGE:
            return { ...state, error: action.error }
        default:
            return state;
    }
}