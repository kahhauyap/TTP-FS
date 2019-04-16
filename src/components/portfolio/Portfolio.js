import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './Portfolio.css'

class Portfolio extends Component {
    state = {
        user: '',
        balance: 0,
        portfolio: [],
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

    // Fetch user portfolio and get real time stock info from API
    getPortfolio = () => {
        axios.get("/api/portfolio")
            .then(response => {
                console.log(response.data)
                this.setState({ 
                    portfolio: response.data,
                    isLoading: false });
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

    map = (portfolio) => {
  //      let stocks = this.state.portfolio.values(){
    //    }
        let stocks = Object.keys(portfolio).map((stock, i) => (
            <li className="travelcompany-input" key={i}>
                <span className="input-label">key: {i} Name: {portfolio[stock]}</span>
            </li>
        ))
        return stocks;
    }
    maps = () => {
        let status = 'neutral';
   //     let stocks 2 = Object.values(this.state.portfolio)
        let stocks = this.mapObject(this.state.portfolio, (stock, value) => {
            let style = { color: 'white' };
            // Get prices for stock shares
/*            
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
                        console.log(stock + " " + value + " " + status)
                    return (<li key={stock} style={style}>{stock} - {value} - {status}</li>)
                })
                .catch(error => console.log(error))
*/
            return (<li key={stock} style={style}>{stock} - {value} - {status}</li>)
        });

        return stocks;
    }


    render() {
        let stocks = this.state.portfolio.map( stock => {
            let totalPrice = ( Math.floor( (stock.latestPrice * stock.shares)* 100) / 100 );
            let style;
            if (stock.changePercent === 0)
                style = {color: "grey"};
            else if (stock.changePercent > 0)
                style = {color: "green"}
            else  
                style = {color: "red"}

            return (
            <li className="portfolio-stock" key={stock.stock} style={style}>
                {stock.stock} - {stock.shares} Shares ${totalPrice} {stock.changePercent}%
            </li>);
        })

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
                            <div className="stock-form">
                            <h2 style={{ color: "white", textAlign: "center"}}>Balance:
                                {this.state.isLoading ?
                                    <h2 style={{ color: "white", textAlign: "center", float:"right", marginRight: "30%"}}>...</h2>
                                    :
                                    <h2 style={{ color: "white", textAlign: "center", float:"right", marginRight: "30%"}}> {this.state.balance}</h2>
                                }</h2>
                                <br></br>
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
                                <div className="alert-msg">{this.state.error} &nbsp;</div>
                            </div>
                        </div>
                    </div>

                </div>
        );
    }
};


export default Portfolio;