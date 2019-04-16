// Presentational component for purchasing stocks
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Store.css'

const Store = (props) => {
    return (
        <div>
            <div className="stock-form">
                <h2 style={{ color: "white", textAlign: "center" }}> Balance:
                                {props.isLoading ?
                        <span style={{ color: "white", textAlign: "center", float: "right", marginRight: "30%" }}>...</span>
                        :
                        <span style={{ color: "white", textAlign: "center", float: "right", marginRight: "30%" }}> {props.balance}</span>
                    }</h2>
                <br></br>
                <Form.Group controlId="symbol">
                    <Form.Label className="symbol-label">Symbol</Form.Label>
                    <Form.Control type="symbol" placeholder="Ticker" onChange={props.handleInputChange} />
                </Form.Group>

                <Form.Group controlId="shares">
                    <Form.Label className="symbol-label">Shares</Form.Label>
                    <Form.Control type="shares" placeholder="Shares" onChange={props.handleInputChange} />
                </Form.Group>

                <Button className="buy-btn btn" variant="primary" onClick={props.buyStock}>
                    Buy
                </Button>


                <div className="alert-msg" style={{ marginTop: "8%" }}>{props.error} &nbsp;</div>
            </div>
        </div >
    );
}

export default Store;