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
        total: 0,
    }

    componentDidMount() {
        this.authenticateUser();
        // this.getPortfolio();
        // this.authenticateUserR();
        this.props.getPortfolio();
    }

    // Check if there is a session for current user
    authenticateUser = () => {
        axios.get('/users/auth')
            .then(response => {
                this.setState({
                    user: response.data.user,
                    balance: response.data.balance
                })
            })
            .catch(error => {
                if (error.response) {
                    const { history } = this.props;
                    history.push('/');
                }
            })
    }

    authenticateUserR = () => {
        if (!this.props.isLoggedIn) this.props.history.push('/');
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
                this.getPortfolio();
                this.setState({ balance: response.data.balance, error: `Purchased ${this.state.shares} ${symbol} Share(s)` });
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
                let total = 0;
                response.data.forEach(stock => {
                    total += (stock.latestPrice * stock.shares);
                })
                total = (Math.floor((total) * 100) / 100);
                this.setState({
                    portfolio: response.data,
                    total,
                    isLoading: false
                });
            })
            .catch(error => {
                this.setState({ isLoading: false })
            });
    }

    // Update state with input values
    handleInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() {
        return (
            <div className="background">
                <div className="nav">
                    <div className="greetings">
                        <h1 className="header">Portfolio ( <span className="portfolio-balance">${this.props.total}</span> )</h1>
                    </div>
                    <div className="navigation">
                        <a className="link portfolio-link" href="/portfolio" style={{ fontSize: '21px' }}>PORTFOLIO</a>
                        <a className="link transaction-link" href="/transactions" style={{ color: 'rgb(248, 248, 248)' }}>TRANSACTIONS</a>
                    </div>
                </div>
                <div className="store transaction-detail">
                    <div>
                        <Store
                            balance={this.state.balance}
                            error={this.state.error}
                            handleInputChange={this.handleInputChange}
                            loading={this.state.isLoading}
                            buyStock={this.buyStock}>
                        </Store>
                    </div>
                </div>
                <Stocks portfolio={this.props.portfolio} isLoading={this.props.isLoading} ></Stocks>
                <button className="logout-btn btn" onClick={this.logoutUser}>logout</button>
                <Button className="logout-btn btn" variant="primary" onClick={this.logoutUser}>logout</Button>
            </div>
        );
    }
};


export default Portfolio;