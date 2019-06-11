import { connect } from 'react-redux';
import { registerUser, registerFail } from '../../actions';
import Register from './Register';

const mapStateToProps = (state) => ({
    error: state.registerFail
})

const mapDispatchToProps = (dispatch) => ({
    registerUser: (name, email, password, history) => dispatch(registerUser(name, email, password, history)),
    registerFail: error => dispatch(registerFail(error))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)

