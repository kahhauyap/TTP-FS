import { connect } from 'react-redux';
import { logoutUser } from '../../actions'
import { getPortfolio, authenticateUser, buyStock } from '../../actions/portfolioActions';
import Portfolio from './Portfolio';

const mapStateToProps = (state) => ({
    portfolio: state.portfolio.portfolio,
    total: state.portfolio.total,
    isLoading: state.portfolio.isLoading,
    balance: state.balance.balance,
    error: state.store.error
})

const mapDispatchToProps = (dispatch) => ({
    getPortfolio: () => dispatch(getPortfolio()),
    authenticateUser: () => dispatch(authenticateUser()),
    logoutUser: () => dispatch(logoutUser()),
    buyStock: (symbol, shares) => dispatch(buyStock(symbol, shares))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Portfolio)

