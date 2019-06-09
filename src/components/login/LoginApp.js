import { connect } from 'react-redux';
import { updateUser, updatePassword } from '../../actions';
import Login from './Login';

const mapStateToProps = (state) => ({
    email: state.email,
    password: state.password
})

const mapDispatchToProps = (dispatch) => ({
    updateUser: email => dispatch(updateUser(email)),
    updatePassword: password => dispatch(updatePassword(password))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

