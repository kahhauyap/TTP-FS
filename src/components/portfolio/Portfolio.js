import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './Portfolio.css'
import Store from '../store/Store';

class Portfolio extends Component {
    state = {
        user: '',
        balance: 0,
        portfolio: [],
        symbol: '',
        shares: 0,
        isLoading: true,
        error: '',
    }

    componentDidMount() {
        this.authenticateUser();
        this.getPortfolio();
    }

    // Check if there is a session for current user
    authenticateUser = () => {
        axios.get('/users/auth')
            .then(response => {
                console.log(response);
                this.setState({
                    user: response.data.user,
                    balance: response.data.balance
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

    // Lougout user and redirect to login
    logoutUser = () => {
        const { history } = this.props;
        axios.get('/users/logout')
            .catch(error => {
                console.log(error);
            });
        history.push('/');
    }

    // Redirect user to transactions page
    redirectTransactions = () => {
        const { history } = this.props;
        history.push('/transactions');
    }

    // Redirect user to portfolio page
    redirectPortfolio = () => {
        const { history } = this.props;
        history.push('/portfolio');
    }

    // Fetch stock information and purchase if balance is enough and symbol is valid
    buyStock = () => {
        let symbol = this.state.symbol.toUpperCase();
        axios.get(`/api/fetch/${symbol}/${this.state.shares}`)
            .then(response => {
                console.log(response.data)
                this.getPortfolio();
                this.setState({ balance: response.data.balance, error: `Purchased ${this.state.shares} ${symbol} share(s)` });
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 400) {
                        this.setState({ error: "Not enough balance!" })
                    } else if (error.response.status === 500) {
                        this.setState({ error: "Not a valid symbol!" })
                    }
                }
            })
    }

    // Fetch user portfolio and get real time stock info from API
    getPortfolio = () => {
        axios.get("/api/portfolio")
            .then(response => {
                console.log(response.data)
                this.setState({
                    portfolio: response.data,
                    isLoading: false
                });
                console.log(this.state.portfolio)
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Update state with input values
    handleInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    // Map the portfolio array to a list
    mapPortfolio = () => {
        let stocks = this.state.portfolio.map(stock => {
            let totalPrice = (Math.floor((stock.latestPrice * stock.shares) * 100) / 100);
            let style;
            if (stock.changePercent === 0)
                style = { color: "grey" };
            else if (stock.changePercent > 0)
                style = { color: "green" }
            else
                style = { color: "red" }

            return (
                <li className="portfolio-stock" key={stock.stock} style={style}>
                    {stock.stock} - {stock.shares} Shares ${totalPrice} {stock.changePercent}%
                </li>
            );
        })
        return stocks;
    }

    render() {
        let stocks = this.mapPortfolio();

        return (

            <div className="background">
                <div className="greetings">
                    <h1>Welcome {this.state.user}</h1>
                </div>

                <div className="navigation">
                    <Button className="portfolio-btn btn" variant="primary" onClick={this.redirectPortfolio}>
                        Portfolio
                        </Button>
                    <Button className="transaction-btn btn" variant="primary" onClick={this.redirectTransactions}>
                        Transactions
                     </Button>
                </div>

                <Button className="logout-btn btn" variant="primary" onClick={this.logoutUser}>
                    Logout
                    </Button>

                <div className="container">
                    <div className="right-container">
                        {this.state.isLoading ?
                            <div>Loading...</div>
                            :
                            <ul className="portfolio-list">{stocks}</ul>
                        }

                    </div>

                    <div className="left-container">
                        <Store
                            balance={this.state.balance}
                            handleInputChange={this.handleInputChange}
                            buyStock={this.buyStock}
                            loading={this.state.isLoading}
                            error={this.state.error}>
                        </Store>
                    </div>
                </div>

            </div>
        );
    }
};


export default Portfolio;