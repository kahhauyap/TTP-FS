import { connect } from 'react-redux';
import { getTransactions, setCurrentTransaction } from '../../actions/transactionsActions';

import Transactions from './Transactions';

const mapStateToProps = (state) => ({
    transactions: state.transactions.transactions,
    symbol: state.currentTransaction.symbol,
    shares: state.currentTransaction.shares,
    date: state.currentTransaction.date,
    price: state.currentTransaction.price
})

const mapDispatchToProps = (dispatch) => ({
    getTransactions: () => dispatch(getTransactions()),
    setCurrentTransaction: (symbol, shares, date, price) => dispatch(setCurrentTransaction(symbol, shares, date, price))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Transactions)
