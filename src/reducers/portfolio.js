import { FETCH_PORTFOLIO, FETCH_PORTFOLIO_SUCCESS, FETCH_PORTFOLIO_FAIL } from '../actions/portfolioActions'

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