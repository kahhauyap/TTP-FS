import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Portfolio from './components/portfolio/Portfolio';
import Transactions from './components/transactions/Transactions';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import LoginApp from './components/login/LoginApp';
import RegisterApp from './components/login/RegisterApp';

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
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/transactions" component={Transactions} />
        </Router>
    </Provider>
);

export default Routes;