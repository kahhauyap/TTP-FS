import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './Portfolio.css'

class Portfolio extends Component {
    state = {
        user: '',
        balance: 0,
        stocks: [],
        isLoading: true
    }

    componentDidMount() {
        this.authenticateUser();
    }

    authenticateUser = () => {
        axios.get('/users/auth')
            .then(response => {
                console.log(response);
                this.setState({
                    user: response.data,
                    isLoading: false
                })
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response);
                    const { history } = this.props;
                    history.push('/');
                }
            })

    }

    logoutUser = () => {
        const { history } = this.props;
        axios.get('/users/logout')
            .catch(err => {
                console.log(err);
            });
        history.push('/');
    }

    render() {
        if (this.state.isLoading) {
            return (<div>Loading...</div>)
        } else {
            return (
                <div>
                    <div className="greetings">
                        <h1>Welcome {this.state.user}</h1>
                    </div>

                    <Button className="logout-btn" variant="primary" onClick={this.logoutUser}>
                        Logout
                    </Button>
                </div>
            );
        }
    };
}

export default Portfolio;