import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './Stocks.css'

class StockPortfolio extends Component {
    state = {
        isLoading: true,
        transactions: {}
    }

    componentDidMount() {
        this.setState({ transactions: this.maps });
    }

    // Map an object's properties into a list
    mapObject = (object, callback) => {
        return Object.keys(object).map(function (key) {
            return callback(key, object[key]);
        });
    }

    // Map the 
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
                    console.log(stock + value + status)


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

                <ul>{stocks}</ul>
        );
    }
}

export default StockPortfolio;