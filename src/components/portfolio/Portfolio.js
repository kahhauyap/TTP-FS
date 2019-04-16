import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './Portfolio.css'
import Store from '../store/Store';
import Stocks from '../stocks/Stocks';

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
        return (
            <div className="background">
                <div className="greetings">
                    <h1 className="header">Welcome {this.state.user}</h1>
                </div>

                <div className="navigation">
                    <a className="link portfolio-link" href="/portfolio" style={{ fontSize: '21px' }}>PORTFOLIO</a>
                    <a className="link transaction-link" href="/transactions" style={{ color: 'rgb(248, 248, 248)' }}>TRANSACTIONS</a>
                </div>

                <Button className="logout-btn btn" variant="primary" onClick={this.logoutUser}>logout</Button>

                <div className="container">
                    <div className="right-container">
                        <Stocks portfolio={this.state.portfolio} isLoading={this.state.isLoading} ></Stocks>
                    </div>

                    <div className="left-container">
                        <Store
                            balance={this.state.balance}
                            error={this.state.error}
                            handleInputChange={this.handleInputChange}
                            loading={this.state.isLoading}
                            buyStock={this.buyStock}>
                        </Store>
                    </div>
                </div>

            </div>
        );
    }
};


export default Portfolio;