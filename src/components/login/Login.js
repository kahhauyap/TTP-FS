import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Link } from "react-router-dom";
import './Login.css'

class Login extends Component {
    state = {
        email: '',
        password: '',
    }

    // Update input
    handleInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
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
            }).catch(err => console.log(err));
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
                            <Form.Control type="email" placeholder="Email" onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={this.handleInputChange} />
                        </Form.Group>

                        <Button className="login-btn" variant="primary" type="submit" onClick={this.onSubmit}>
                            Login
                        </Button>

                        <Link to="/register">
                            <Button className="login-btn" variant="primary">
                                Register
                        </Button>
                        </Link>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login;