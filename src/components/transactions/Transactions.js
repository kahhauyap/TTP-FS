import React, { Component } from 'react';
import axios from 'axios';
import './Transactions.css'

class Transactions extends Component {

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
        this.props.getTransactions()
    }

    // Format the transactions into a list to display
    formatTransactions = (transactions) => {
        let transactionList = [];
        transactions.forEach(transaction => {
            let { symbol, shares, price, date } = transaction;
            price = (Math.floor((price / shares) * 100) / 100);
            const transactionDetail = {
                symbol,
                shares,
                price,
                date: this.formatDate(date)
            }
            transactionList.push(transactionDetail)
        })
        return transactionList;
    }

    // Set the detailed stock information of selected transaction
    onClick = (index) => {
        const { symbol, shares, date, price } = this.props.transactions[index];
        this.props.setCurrentTransaction(symbol, shares, date, price);
    }

    // Format the list of transactions pulling the details
    formatList = () => {
        let transactions = this.props.transactions.map((transaction, index) => {
            return (<li className="transaction" key={index} onClick={this.onClick.bind(this, index)}>
                BUY ( <span className="transaction-symbol">  {transaction.symbol} </span>)
                - {transaction.shares} Shares @<span className="transaction-price"> ${transaction.price}</span>
            </li>)
        })
        return transactions;
    }

    // Format date into Month, Day, Year
    formatDate = (date) => {
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let year = date.substring(0, 4);
        let month = date.substring(5, 7);
        let day = date.substring(8, 10);
        let newDate = monthNames[parseInt(month) - 1] + " " + day + ", " + year;
        return newDate;
    }

    render() {
        let transactions = this.formatList();
        return (
            <div>
                {this.props.isLoading ?
                    <div className="spinner-border text-light" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    :
                    <div className="background">

                        <div className="nav">
                            <div>
                                <h1 className="header">Transactions</h1>
                            </div>
                            <div className="navigation">
                                <a className="link portfolio-link" href="/portfolio" style={{ color: 'rgb(248, 248, 248)' }}>PORTFOLIO</a>
                                <a className="link transaction-link" href="/transactions" style={{ fontSize: '21px' }}>TRANSACTIONS</a>
                            </div>
                        </div>
                        <div className="grid">
                            <div className="transaction-detail trans">
                                <div>
                                    <h1 className="symbol-detail">{this.props.symbol}</h1>
                                    <hr></hr>
                                    <h2>{this.props.shares} SHARES - <span className="money">${this.props.price}</span></h2>
                                    <h2>TOTAL - <span className="money">${this.props.price * this.props.shares}</span></h2>
                                    <h3>PURCHASED - {this.props.date} </h3>
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