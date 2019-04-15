import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/login/Register';
import Portfolio from './components/portfolio/Portfolio';
import Transactions from './components/transactions/Transactions';

const Routes = () => (
    <Router>
        <div>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/transactions" component={Transactions} />
        </div>
    </Router>
);

export default Routes;