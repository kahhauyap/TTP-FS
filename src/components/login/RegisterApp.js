import { connect } from 'react-redux';
import { registerUser } from '../../actions';
import Register from './Register';

const mapStateToProps = (state) => ({
    error: state.registerFail
})

const mapDispatchToProps = (dispatch) => ({
    registerUser: (name, email, password, history) => dispatch(registerUser(name, email, password, history))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)

