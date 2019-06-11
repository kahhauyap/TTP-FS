import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './Portfolio.css'
import Store from '../store/Store';
import Stocks from '../stocks/Stocks';

class Portfolio extends Component {
    state = {
        symbol: '',
        shares: 0,
    }

    componentDidMount() {
        this.props.authenticateUser();
        this.props.getPortfolio();
    }

    // Lougout user and redirect to login
    logoutUser = () => {
        const { history } = this.props;
        axios.get('/users/logout')
            .catch(error => {
                console.log(error);
            });
        this.props.logoutUser();
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
        this.props.buyStock(symbol, this.state.shares);
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
                            balance={this.props.balance}
                            error={this.props.error}
                            handleInputChange={this.handleInputChange}
                            loading={this.props.isLoading}
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