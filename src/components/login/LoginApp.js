import { connect } from 'react-redux';
import { updateEmail, updatePassword } from '../../actions';
import Login from './Login';

const mapStateToProps = (state) => ({
    email: state.email,
    password: state.password
})

const mapDispatchToProps = (dispatch) => ({
    updateEmail: email => dispatch(updateEmail(email)),
    updatePassword: password => dispatch(updatePassword(password))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

