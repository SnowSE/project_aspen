import React, { useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

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
            </div>
            
        </div >);



    
}


function App() {
    return (
        <div></div>);
}
