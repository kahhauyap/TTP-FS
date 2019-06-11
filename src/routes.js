import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Transactions from './components/transactions/Transactions';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import LoginApp from './components/login/LoginApp';
import RegisterApp from './components/login/RegisterApp';
import PortfolioApp from './components/portfolio/PortfolioApp';
import TransactionsApp from './components/transactions/TransactionsApp';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk))
);

const Routes = () => (
    <Provider store={store}>
        <Router>
            <Route exact path="/" component={LoginApp} />
            <Route path="/register" component={RegisterApp} />
            <Route path="/portfolio" component={PortfolioApp} />
            <Route path="/transactions" component={TransactionsApp} />
        </Router>
    </Provider>
);

export default Routes;