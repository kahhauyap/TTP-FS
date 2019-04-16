import React, { Component } from 'react';
import axios from 'axios';
import './Transactions.css'

class Transactions extends Component {

    state = {
        isLoading: false,
        transactions: [],
        symbol: '',
        shares: null,
        date: null,
        price: null
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
                    isLoading: false,
                });
                // Component was not being properly rendered in single call to set state
                this.setState({
                    symbol: this.state.transactions[0].symbol,
                    shares: this.state.transactions[0].shares,
                    date: this.state.transactions[0].date,
                    price: this.state.transactions[0].price
                });
            })
            .catch(error => console.log(error));
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
        this.setState({
            symbol: this.state.transactions[index].symbol,
            shares: this.state.transactions[index].shares,
            date: this.state.transactions[index].date,
            company: this.state.transactions[index].company,
            price: this.state.transactions[index].price
        })
    }

    // Format the list of transactions pulling the details
    formatList = () => {
        let style;
        let transactions = this.state.transactions.map((transaction, index) => {
            if (index % 2 !== 0)
                style = { backgroundColor: "white", color: "black" };
            else
                style = { backgroundColor: "rgba(255,255,255,.2)" };

            return <li className="transaction" key={index} style={style} onClick={this.onClick.bind(this, index)}>BUY ({transaction.symbol}) - {transaction.shares} Shares @ {transaction.price} </li>
        })
        return transactions;
    }

    formatDate = (date) => {
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];
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
                {this.state.isLoading ?
                    <div>Loading...</div>
                    :
                    <div className="background">

                        <div className="nav">   <div>
                            <h1 className="header">Transactions</h1>
                        </div>
                            <div className="navigation">
                                <a className="link portfolio-link" href="/portfolio" style={{ color: 'rgb(248, 248, 248)' }}>PORTFOLIO</a>
                                <a className="link transaction-link" href="/transactions" style={{ fontSize: '21px' }}>TRANSACTIONS</a>
                            </div>
                        </div>
                        <div className="grid">
                            <div className="transaction-detail">
                                <div>
                                    <h1 className="symbol-detail">{this.state.symbol}</h1>
                                    <hr></hr>
                                    <h2>{this.state.shares} SHARE(S) - ${this.state.price}</h2>
                                    <h2>TOTAL - ${this.state.price * this.state.shares}</h2>
                                    <h3>PURCHASED - {this.state.date} </h3>
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