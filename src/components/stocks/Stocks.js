import React, { Component } from 'react';
import './Stocks.css'

class Stocks extends Component {
    state = {
        portfolio: [],
        isLoading: true
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps)
        this.setState({ portfolio: newProps.portfolio, isLoading: newProps.isLoading });
    }

    // Map the portfolio array to a list
    mapPortfolio = () => {
        let stocks = this.props.portfolio.map(stock => {
            let totalPrice = (Math.floor((stock.latestPrice * stock.shares) * 100) / 100);
            let style;
            let changeStyle;
            // Dynamically style stock information based on performance
            if (stock.changePercent === 0) {
                style = { color: "rgb(194, 194, 194)" };
                changeStyle = { backgroundColor: "rgb(194, 194, 194)" }
            } else if (stock.changePercent > 0) {
                style = { color: "rgb(92, 255, 141)" }
                changeStyle = { backgroundColor: "rgb(96, 221, 96)" }
            } else {
                style = { color: "rgb(221, 111, 96)" }
                changeStyle = { backgroundColor: "rgb(221, 111, 96)" }
            }

            return (
                <li className="transaction portfolio-stock" key={stock.stock} >
                    <span className="portfolio-info">
                        <span className="portfolio-symbol" style={style}>{stock.stock} </span>
                        <span className="tab-space"> - </span>
                        <span className="portfolio-shares">
                            {stock.shares} Shares
                        </span>
                    </span>
                    <span className="portfolio-change" style={changeStyle}>{stock.changePercent}% </span>
                    <span style={style} className="portfolio-price"> ${totalPrice} </span>
                </li>
            );
        })
        return stocks;
    }

    render() {
        let stocks = this.mapPortfolio();

        return (
            <div>

                <div className="back-drop">
                    {this.state.isLoading ?
                        <div className="spinner-border text-light" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        :
                        <ul className="list">{stocks}</ul>
                    }
                </div>

            </div>
        )
    }
}

export default Stocks;