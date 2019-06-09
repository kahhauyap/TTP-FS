import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Link } from "react-router-dom";
import './Login.css'
import { store } from '../../routes';

class Login extends Component {
    state = {
        email: '',
        password: '',
        error: ''
    }

    // Update input
    handleInputChange = (event) => {
        this.props.updateUser(event.target.value)
        console.log(this.props)
        /*
        this.setState({
            [event.target.id]: event.target.value
        })
        */
    }

    // Dispatch actions to update user info
    handleEmailChange = (event) => {
        this.props.updateEmail(event.target.value)
    }

    handlePasswordChange = (event) => {
        this.props.updatePassword(event.target.value)
    }

    // Login POST request to database to validate user credentials
    onSubmit = (event) => {
        event.preventDefault();

        axios.post('/users/login', {
            email: this.state.email,
            password: this.state.password
        })
            .then(() => {
                const { history } = this.props;
                history.push('/portfolio');
            }).catch(error => {
                if (error.response.status === 404)
                    this.setState({ error: "User was not found" })
                else if (error.response.status === 400)
                    this.setState({ error: "Incorrect password" })
            });
    }

    render() {
        return (
            <div className="Login">
                <h1 className="title">TTP Stock</h1>
                <div className="login-form">
                    <h1 className="login-header">Login</h1>

                    <Form>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" onChange={this.handleEmailChange} />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={this.handlePasswordChange} />
                        </Form.Group>
                        <div className="button-set">
                            <Button className="login-btn" variant="primary" type="submit" onClick={this.onSubmit}>
                                Login
                            </Button>

                            <Link to="/register">
                                <Button className="login-btn" variant="primary">
                                    Register
                            </Button>

                            </Link>
                        </div>
                    </Form>
                    <div className="alert-msg login-alert" style={{ marginTop: "1%" }}>{this.state.error} &nbsp;</div>
                </div>
            </div>
        );
    }
}

export default Login;