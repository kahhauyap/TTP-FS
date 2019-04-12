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
        symbol: '',
        isLoading: true
    }

    componentDidMount() {
        this.authenticateUser();
    }

    // Check if there is a session for current user
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

    // Lougout user and redirect user to login
    logoutUser = () => {
        const { history } = this.props;
        axios.get('/users/logout')
            .catch(err => {
                console.log(err);
            });
        history.push('/');
    }

    // Fetch stock information and purchase if balance is enough
    buyStock = () => {
        axios.get(`/api/fetch/${this.state.symbol}`)
            .then(response => console.log(response.data))
            .catch(error => {
                if (error.response) {
                    console.log(error.response);
                    const { history } = this.props;
                    history.push('/');
                }
            })
    }

    // Update state with input values
    handleInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
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

                    <Button className="logout-btn btn" variant="primary" onClick={this.logoutUser}>
                        Logout
                    </Button>
                    <div className="stock-form">
                        <Form.Group controlId="symbol">
                            <Form.Label className="symbol-label">Symbol</Form.Label>
                            <Form.Control type="symbol" placeholder="Symbol" onChange={this.handleInputChange} />
                        </Form.Group>

                        <Button className="buy-btn btn" variant="primary" onClick={this.buyStock}>
                            Buy
                    </Button>
                    </div>

                </div>
            );
        }
    };
}

export default Portfolio;