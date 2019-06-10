import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { withRouter } from "react-router";
import './Login.css'


class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            name: '',
            password: '',
            error: ''
        }

        this.email = React.createRef();
        this.name = React.createRef();
        this.password = React.createRef();
    }


    handleInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
        console.log(this.name.current.value)
    }

    // Register user then redirect to login page
    onSubmit = (event) => {
        event.preventDefault();
        if (!this.validateEmail(this.state.email)) {
            this.setState({ error: "Not a valid email" })
            return;
        }
        axios.post('/users/register', {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        })
            .then(() => {
                this.setState({ error: "User registered" })
                const { history } = this.props;
                history.push('/');
            }).catch(error => {
                if (error.response.status === 400)
                    this.setState({ error: "Email already in use" })
            });

    }

    onRegister = (event) => {
        event.preventDefault();
        if (!this.validateEmail(this.state.email)) {
            this.setState({ error: "Not a valid email" })
            return;
        }
        const { name, email, password } = this.state;
        this.props.registerUser(name, email, password, this.props.history)
        console.log(this.props.error)
    }

    // Validate email
    validateEmail = (email) => {
        if (!email.includes(".com") || !email.includes("@") || email.length < 5)
            return false;
        return true;
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
                            <Form.Control ref={this.name} type="name" placeholder="Full name" onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={this.handleInputChange} />
                        </Form.Group>

                        <Button className="login-btn register-btn" variant="primary" type="submit" onClick={this.onRegister}>
                            Sign up
                        </Button>
                    </Form>
                    <div className="alert-msg login-alert" style={{ marginTop: "1%" }}>{this.props.error} &nbsp;</div>
                </div>
            </div>
        );
    }
}

export default withRouter(Register);