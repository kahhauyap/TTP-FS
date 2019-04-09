import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css'

class Login extends Component {
    state = {
        name: '',
        email: '',
        password: '',
    }

    // Updates the state of component with data entered into form
    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });
    }

    handleInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    onLogin = (event) => {
        event.preventDefault();
        console.log("email: " + this.state.email + " | password: " + this.state.password);
    }

    render() {

        const style = {
            width: '40%',
            border: 'black 1px solid',
            margin: 'auto',
            padding: '1em',
            marginTop: '15%',
            background: 'rgba(0,0,0,.5)'
        }
        const background = {
            height: '100%',
            background: "url('https://cdn.wallpapersafari.com/0/44/Qz4Any.jpg')"
        }

        return (
            <div className="Login">
                <h1 className="title">TTP Stock</h1>
                <div className="login-form">
                    <h1>Login</h1>
                    <Form>
                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Email" onChange={this.handleInput} />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={this.handleInput} />
                        </Form.Group>
                        <Button className="login-btn" variant="primary" type="submit" onClick={this.onLogin}>
                            Login
                        </Button>
                        <Button className="login-btn" variant="primary" type="submit" onClick={this.onLogin}>
                            Sign up
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login;