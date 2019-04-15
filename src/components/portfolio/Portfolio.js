import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './Portfolio.css'

class Portfolio extends Component {
    state = {
        user: '',
        balance: 0,
        portfolio: {},
        symbol: '',
        shares: 1,
        isLoading: true,
        error: '',
        loadPortfolio: true,
        temp: ['1', '2']
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

    // Lougout user and redirect user to login
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
                this.setState({ balance: response.data.balance });
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
        this.setState({ error: `Purchased ${this.state.shares} ${symbol} share(s)` })
    }

    getPortfolio = () => {
        axios.get("/api/portfolio")
            .then(response => {
                this.setState({ portfolio: response.data, isLoading: false });
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

    mapObject = (object, callback) => {
        return Object.keys(object).map(function (key) {
            return callback(key, object[key]);
        });

    }


    maps = () => {
        let status = 'neutral';
        let stocks = this.mapObject(this.state.portfolio, (stock, value) => {
            let style = { color: 'green' };
            // Get prices for stock shares
            axios.get(`https://api.iextrading.com/1.0/stock/${stock}/quote`)
                .then(response => {
                    const { latestPrice, open } = response.data;
                    let stockStatus = open - latestPrice;

                    if (stockStatus < open)
                        status = 'low'
                    else if (stockStatus > open)
                        status = 'high'
                    else
                        status = 'neutral'

                    if (status === 'neutral')
                        style = { color: 'blue' };
                    else if (status === 'low')
                        style = { color: 'red' };
                    else
                        style = { color: 'green' };
                    return (<li key={stock} style={style}>{stock} - {value} - {status}</li>)
                })

                .catch(error => console.log(error))

            return (<li key={stock} style={style}>{stock} - {value} - {status}</li>)
        });

        return stocks;
    }


    render() {
        let stocks = this.maps();


        return (
            this.state.isLoading ?
                <div>Loading...</div>
                :
                <div>
                    <div className="greetings">
                        <h1>Welcome {this.state.user}</h1>
                        <h2>{this.state.balance}</h2>
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
                        <br></br><br></br>
                        {this.state.error}
                    </div>

                    <ul>{stocks}</ul>
                </div>
        );
    }
};


export default Portfolio;