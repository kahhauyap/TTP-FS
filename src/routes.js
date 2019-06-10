import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/login/Register';
import Portfolio from './components/portfolio/Portfolio';
import Transactions from './components/transactions/Transactions';
import LoginApp from './components/login/LoginApp'

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk))
);

const Routes = () => (
    <Provider store={store}>
        <Router>
            <Route exact path="/" component={LoginApp} />
            <Route path="/register" component={Register} />
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/transactions" component={Transactions} />
        </Router>
    </Provider>
);

export default Routes;