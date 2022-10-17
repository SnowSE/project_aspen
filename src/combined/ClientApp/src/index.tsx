import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import App from "./App";
//import { store } from "./store";
import { Provider } from "react-redux";

//import "./custom.scss";
import "bootstrap/dist/js/bootstrap";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(); typescript broke this
