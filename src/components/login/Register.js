import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { withRouter } from "react-router";
import './Login.css'

class Register extends Component {
    state = {
        email: '',
        name: '',
        password: '',
        error: ''
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    // Register user then redirect to login page
    onSubmit = (event) => {
        event.preventDefault();
        axios.post('/users/register', {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        })
            .then(() => {
                const { history } = this.props;
                history.push('/');
            }).catch(error => {
                console.log(error.response)
                if (error.response.status === 400)
                    this.setState({ error: "Email already in use" })
            });
    }

    render() {
        return (
            <div className="Login">
                <h1 className="title">TTP Stock</h1>
                <div className="login-form">
                    <h1 className="register-header">Register</h1>
                    <Form>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder="Full name" onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={this.handleInputChange} />
                        </Form.Group>

                        <Button className="login-btn register-btn" variant="primary" type="submit" onClick={this.onSubmit}>
                            Sign up
                        </Button>
                    </Form>
                    <div className="alert-msg login-alert" style={{ marginTop: "1%" }}>{this.state.error} &nbsp;</div>
                </div>
            </div>
        );
    }
}

export default withRouter(Register);