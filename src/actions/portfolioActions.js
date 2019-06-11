import axios from 'axios';

export const FETCH_PORTFOLIO = 'FETCH_PORTFOLIO';
export const FETCH_PORTFOLIO_FAIL = 'FETCH_PORTFOLIO_FAIL';
export const FETCH_PORTFOLIO_SUCCESS = 'FETCH_PORTFOLIO_SUCCESS';

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
        console.log('ayo')
        axios.get("/api/portfolio")
            .then(response => {
                let total = 0; console.log('ayo2')
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