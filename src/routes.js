import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Portfolio from './components/portfolio/Portfolio';

const Routes = () => (
    <Router>
        <div>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/portfolio" component={Portfolio} />
        </div>
    </Router>
);

export default Routes;