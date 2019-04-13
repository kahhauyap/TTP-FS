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
        shares: 1,
        isLoading: true,
        error: ''
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
                    user: response.data.user,
                    balance: response.data.balance,
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

    // Fetch stock information and purchase if balance is enough and symbol is valid
    buyStock = () => {
        axios.get(`/api/fetch/${this.state.symbol}/${this.state.shares}`)
            .then(response => {
                console.log(response.data)
                this.setState({ balance: response.data.balance });
            }
            )
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 400) {
                        this.setState({ error: "Not enough balance!" })
                    } else if (error.response.status === 500) {
                        this.setState({ error: "Not a valid symbol!" })
                    }
                }
            })
        this.setState({ error: '' })
    }

    // Update state with input values
    handleInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() {

        return (
            this.state.isLoading ?
                <div>Loading...</div>
                :
                <div>
                    <div className="greetings">
                        <h1>Welcome {this.state.user}</h1>
                        <h2>{this.state.balance}</h2>
                    </div>

                    <Button className="logout-btn btn" variant="primary" onClick={this.logoutUser}>
                        Logout
                    </Button>
                    <div className="stock-form">
                        <Form.Group controlId="symbol">
                            <Form.Label className="symbol-label">Symbol</Form.Label>
                            <Form.Control type="symbol" placeholder="Symbol" onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group controlId="shares">
                            <Form.Label className="symbol-label">Shares</Form.Label>
                            <Form.Control type="shares" placeholder="Shares" onChange={this.handleInputChange} />
                        </Form.Group>

                        <Button className="buy-btn btn" variant="primary" onClick={this.buyStock}>
                            Buy
                         </Button>
                        <br></br>
                        {this.state.error}
                    </div>

                </div>
        );
    }
};


export default Portfolio;