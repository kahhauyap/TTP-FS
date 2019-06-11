import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Link } from "react-router-dom";
import './Login.css'

class Login extends Component {

    // Dispatch actions to update user info
    handleEmailChange = (event) => {
        this.props.updateEmail(event.target.value)
    }

    handlePasswordChange = (event) => {
        this.props.updatePassword(event.target.value)
    }

    // Login POST request to database to validate user credentials
    onLogin = (event) => {
        event.preventDefault();
        const { email, password } = this.props;
        this.props.userLogin(email, password, this.props.history);
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
                            <Button className="login-btn" variant="primary" type="submit" onClick={this.onLogin}>
                                Login
                            </Button>

                            <Link to="/register">
                                <Button className="login-btn" variant="primary">
                                    Register
                            </Button>

                            </Link>
                        </div>
                    </Form>
                    <div className="alert-msg login-alert" style={{ marginTop: "1%" }}>{this.props.error} &nbsp;</div>
                </div>
            </div>
        );
    }
}

export default Login;