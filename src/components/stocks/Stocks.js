import React, { Component } from 'react';
import './Stocks.css'

class Stocks extends Component {

    // Map the portfolio array to a list
    mapPortfolio = () => {
        let stocks = this.props.portfolio.map(stock => {
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
        let stocks = this.mapPortfolio();

        return (
            <div>
                {this.props.isLoading ?
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    :
                    <ul className="portfolio-list">

                        {stocks}

                    </ul>
                }
            </div>
        )
    }
}

export default Stocks;