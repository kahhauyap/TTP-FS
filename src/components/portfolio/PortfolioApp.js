import { connect } from 'react-redux';
import { getPortfolio } from '../../actions/portfolioActions';
import Portfolio from './Portfolio';

const mapStateToProps = (state) => ({
    portfolio: state.portfolio.portfolio,
    total: state.portfolio.total,
    isLoading: state.portfolio.isLoading
})

const mapDispatchToProps = (dispatch) => ({
    getPortfolio: () => dispatch(getPortfolio())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Portfolio)

