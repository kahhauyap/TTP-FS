import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { withRouter } from "react-router";
import './Login.css'


class Register extends Component {
    state = {
        email: '',
        name: '',
        password: '',
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        const userData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };
        console.log(userData);
        const { history } = this.props;
        history.push('/');
    }

    render() {
        return (
            <div className="Login">
                <h1 className="title">TTP Stock</h1>
                <div className="login-form">
                    <h1>Register</h1>
                    <Form>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder="Full name" onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Email" onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={this.handleInputChange} />
                        </Form.Group>

                        <Button className="login-btn" variant="primary" type="submit" onClick={this.onSubmit}>
                            Sign up
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default withRouter(Register);