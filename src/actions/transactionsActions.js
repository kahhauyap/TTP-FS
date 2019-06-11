import axios from 'axios';

export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS';
export const FETCH_TRANSACTIONS_SUCCESS = 'FETCH_TRANSACTIONS_SUCCESS';
export const FETCH_TRANSACTIONS_FAIL = 'FETCH_TRANSACTIONS_FAIL';
export const SET_CURRENT_TRANSACTION = 'SET_CURRENT_TRANSACTION';
export const fetchTransactions = () => ({
    type: FETCH_TRANSACTIONS
})

export const fetchTransactionsSuccess = (transactions) => ({
    type: FETCH_TRANSACTIONS_SUCCESS,
    transactions
})

export const fetchTransactionsFail = () => ({
    type: FETCH_TRANSACTIONS_FAIL
})

// Format the transactions into a list to display
const formatTransactions = (transactions) => {
    let transactionList = [];
    transactions.forEach(transaction => {
        let { symbol, shares, price, date } = transaction;
        price = (Math.floor((price / shares) * 100) / 100);
        const transactionDetail = {
            symbol,
            shares,
            price,
            date: formatDate(date)
        }
        transactionList.push(transactionDetail)
    })
    return transactionList;
}

// Format date into Month, Day, Year
const formatDate = (date) => {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let year = date.substring(0, 4);
    let month = date.substring(5, 7);
    let day = date.substring(8, 10);
    let newDate = monthNames[parseInt(month) - 1] + " " + day + ", " + year;
    return newDate;
}

export const getTransactions = () => dispatch => {
    dispatch(fetchTransactions())
    axios.get(`/api/transactions`)
        .then(response => {
            if (!response.data) dispatch(fetchTransactionsSuccess([]));
            let transactionList = formatTransactions(response.data);
            const { symbol, shares, date, price } = transactionList[0];
            dispatch(setCurrentTransaction(symbol, shares, date, price));
            dispatch(fetchTransactionsSuccess(transactionList));
        })
        .catch(dispatch(fetchTransactionsFail));
}

export const setCurrentTransaction = (symbol, shares, date, price) => ({
    type: SET_CURRENT_TRANSACTION,
    symbol,
    shares,
    date,
    price
})