import { connect } from 'react-redux';
import { updateUser } from '../../actions';
import Login from './Login';

const mapStateToProps = (state) => ({
    email: state.email,
    password: state.password
})

const mapDispatchToProps = (dispatch) => ({
    updateUser: email => dispatch(updateUser(email))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

