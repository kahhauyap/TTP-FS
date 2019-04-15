import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './Transactions.css'

class Transactions extends Component {

    state = {
        isLoading: false,
        transactions: []
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
        let transactions = this.state.transactions.map(transaction =>
            <li className="transaction" key={transaction}>BUY ({transaction.symbol}) - {transaction.shares} Shares @ {transaction.price} </li>
        )
        return transactions;
    }

    render() {
        let transactions = this.formatList();
        return (
            this.state.isLoading ?
                <div>Loading...</div>
                :
                <div className="background">
                    <div>
                        <h1 className="header">Transactions</h1>
                    </div>
                    <div className="navigation">
                        <Button className="portfolio-btn btn" variant="primary" onClick={this.redirectPortfolio}>
                            Portfolio
                    </Button>
                        <Button className="transaction-btn btn" variant="primary" onClick={this.redirectTransactions}>
                            Transactions
                    </Button>
                    </div>

                    <div className="back-drop">
                        <ul className="list">{transactions}</ul>
                    </div>
                </div >
        );
    }
}

export default Transactions;