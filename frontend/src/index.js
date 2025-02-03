import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Redirect, Route } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import index from './pages/home'
import about from './pages/about';
import pickPose from './pages/pickPose';
import practice from './pages/practice';
import './Login.css';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route path='/dashboard' component={index} />
            <Route path='/aboutUs' component={about} />
            <Route path='/pickPose' component={pickPose} />
            <Route path='/practice' component={practice} />
            {/* <Route component={NotFound}/> */}
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);