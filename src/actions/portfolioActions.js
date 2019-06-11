import axios from 'axios';

export const FETCH_PORTFOLIO = 'FETCH_PORTFOLIO';
export const FETCH_PORTFOLIO_FAIL = 'FETCH_PORTFOLIO_FAIL';
export const FETCH_PORTFOLIO_SUCCESS = 'FETCH_PORTFOLIO_SUCCESS';
export const SET_BALANCE = 'SET_BALANCE';

export const fetchPortfolio = () => ({
    type: FETCH_PORTFOLIO
})

export const fetchPortfolioSuccess = (portfolio, total) => ({
    type: FETCH_PORTFOLIO_SUCCESS,
    portfolio,
    total
})

export const fetchPortfolioFail = () => ({
    type: FETCH_PORTFOLIO_FAIL
})

// Fetch user portfolio and get real time stock info from API
export const getPortfolio = () => {
    return dispatch => {
        dispatch(fetchPortfolio());
        axios.get("/api/portfolio")
            .then(response => {
                let total = 0;
                response.data.forEach(stock => {
                    total += (stock.latestPrice * stock.shares);
                })
                total = (Math.floor((total) * 100) / 100);
                dispatch(fetchPortfolioSuccess(response.data, total));
            })
            .catch(() => {
                dispatch(fetchPortfolioFail());
            });
    }
}

const setBalance = (balance) => ({
    type: SET_BALANCE,
    balance
})

export const authenticateUser = () => dispatch => {
    axios.get('/users/auth')
        .then(response => {
            dispatch(setBalance(response.data.balance));
            return true;
        })
        .catch(error => {
            if (error.response) {
                return false;
            }
        })
}


// Fetch stock information and purchase if balance is enough and symbol is valid
export const buyStock = (symbol, shares) => dispatch => {
    axios.get(`/api/fetch/${symbol}/${shares}`)
        .then(response => {
            dispatch(getPortfolio());
            dispatch(setBalance(response.data.balance));
            dispatch(setMessage(`Purchased ${shares} ${symbol} Share(s)`))
        })
        .catch(error => {
            if (error.response) {
                if (error.response.status === 400) {
                    dispatch(setMessage("Not enough balance!"))
                } else if (error.response.status === 500) {
                    dispatch(setMessage("Not a valid symbol!"))
                }
            }
        })
}

export const SET_MESSAGE = 'SET_MESSAGE';

export const setMessage = (message) => ({
    type: SET_MESSAGE,
    error: message
})
