import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './Transactions.css'

class Transactions extends Component {

    state = {
        isLoading: false,
        transactions: [],
        symbol: 'AAPL',
        shares: 1
    }

    componentDidMount() {
        this.getTransactions();
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

    // Get the transactions from the current user
    getTransactions = () => {
        axios.get(`/api/transactions`)
            .then(response => {
                let transactionList = this.formatTransactions(response.data);
                this.setState({
                    transactions: transactionList,
                    isLoading: false
                });
            })
            .catch(error => console.log(error));
    }

    // Format the transactions into a list to display
    formatTransactions = (transactions) => {
        let transactionList = [];
        transactions.forEach(transaction => {
            const { symbol, shares, price } = transaction;
            const transactionDetail = {
                symbol,
                shares,
                price
            }
            transactionList.push(transactionDetail)
        })
        return transactionList;
    }

    // Format the list of transactions pulling the details
    formatList = () => {
        let style;
        let transactions = this.state.transactions.map((transaction, index) => {
            if (index % 2 == 0)
                style = { backgroundColor: "white", color: "black" };
            else
                style = { backgroundColor: "rgba(255,255,255,.2)" };

            return <li className="transaction" key={index} style={style}>BUY ({transaction.symbol}) - {transaction.shares} Shares @ {transaction.price} </li>
        })
        return transactions;
    }

    render() {
        let transactions = this.formatList();
        return (
            <div>
                {this.state.isLoading ?
                    <div>Loading...</div>
                    :
                    <div className="background">

                        <div className="nav">   <div>
                            <h1 className="header">Transactions</h1>
                        </div>
                            <div className="navigation">
                                <a className="link portfolio-link" href="/portfolio" style={{ color: 'rgb(248, 248, 248)' }}>PORTFOLIO</a>
                                <a className="link transaction-link" href="/transactions" style={{ fontSize: '21px' }}>TANSACTIONS</a>
                            </div>
                        </div>
                        <div className="grid">
                            <div className="transaction-detail">
                                <div>
                                    <h1>{this.state.symbol}</h1>
                                    {this.state.shares}
                                </div>
                            </div>
                            <div className="back-drop">
                                <ul className="list">{transactions}</ul>
                            </div>
                        </div>

                    </div>
                }
            </div>
        );
    }
}

export default Transactions;