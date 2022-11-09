import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import App from "./App";
//import { store } from "./store";
import { Provider } from "react-redux";

//import "./custom.scss";
import "bootstrap/dist/js/bootstrap";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavMenu from './components/NavMenu';
import { Home } from './Pages/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { LoginPage } from './components/LoginPage';
import Landing from './Pages/LoginLanding';

const root = createRoot(document.getElementById("root")!);
root.render(
    <BrowserRouter>
        <NavMenu />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fetch-data" element={<FetchData />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/login" element={<LoginPage /> } />
            <Route path="/landing" element = {<Landing/>}/>
            {/*<Route path="/swagger" element={<swagger />} />*/}
        </Routes>
    </BrowserRouter>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(); typescript broke this
