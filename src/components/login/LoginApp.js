import { connect } from 'react-redux';
import { updateEmail, updatePassword, userLogin, loginUser } from '../../actions';
import Login from './Login';

const mapStateToProps = (state) => ({
    email: state.user.email,
    password: state.user.password,
    currentUser: state.currentUser.user,
    error: state.loginFail.loginError
})

const mapDispatchToProps = (dispatch) => ({
    updateEmail: email => dispatch(updateEmail(email)),
    updatePassword: password => dispatch(updatePassword(password)),
    userLogin: (email, password, history) => dispatch(loginUser(email, password, history))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

