import React, { Component } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import NavMenu from './components/NavMenu';
import './custom.css';

const root = process.env.PUBLIC_URL
if (!root) {
    throw "PUBLIC_URL is undefined";
}

function App() {
    return (
        <BrowserRouter basename={`${process.env.PUBLIC_URL}`}>
            <Layout>
                <Routes>
                    {AppRoutes.map((route, index) => {
                        const { element, ...rest } = route;
                        return <Route key={index} {...rest} element={element} />;
                    })}
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}
export default App;