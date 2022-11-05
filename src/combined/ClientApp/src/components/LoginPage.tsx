import React, { useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import homeimage from '../Images/home';
export function LoginPage() {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate(-1)}>Go back 1 Page</button>
            <div>
                <nav>                   
                       <Link to="/"></Link>                       
                </nav>
                <Routes>
                    <Route path="/" element={<App />} />
                </Routes>

                <Link to="/">
                    <img src={homeimage} alt="home"></img>
                </Link>
                <form>
                    <label> bobassdfsdfd </label>
                </form>
            </div>
            
        </div >);



    
}


function App() {
    return (
        <div></div>);
}
