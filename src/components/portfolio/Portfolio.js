import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

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
        axios.get('/users/test')
            .then(response => {
                console.log(response);
                this.setState({
                    user: response.data
                })
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response);
                }
            })


    }

    logoutUser = () => {
        const { history } = this.props;
        axios.get('/users/logout')
            .catch(err => {
                console.log(err);
                history.push('/');
            });
        history.push('/');
    }

    render() {
        return (
            <div>
                Welcome {this.state.user}
                <button onClick={this.logoutUser}>Logout</button>
            </div>
        );
    };
}

export default Portfolio;