import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/Register' component={Register} />
        <Route path='/counter' component={Counter} />
    </Layout>
);
