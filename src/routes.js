import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/login/Register';
import Portfolio from './components/portfolio/Portfolio';
import Transactions from './components/transactions/Transactions';
import LoginApp from './components/login/LoginApp'

import { createStore } from 'redux'
import { Provider } from 'react-redux';
import rootReducer from './reducers';

export const store = createStore(rootReducer);

const Routes = () => (
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={LoginApp} store={store} />
                <Route path="/register" component={Register} />
                <Route path="/portfolio" component={Portfolio} />
                <Route path="/transactions" component={Transactions} />
            </div>
        </Router>
    </Provider>
);

export default Routes;