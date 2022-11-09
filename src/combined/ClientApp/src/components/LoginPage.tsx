import React, { useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import homeimage from '../Images/home.png';
import { Grid } from "@mui/material"
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { authService } from '../services/authService';

export function LoginPage() {

    const [loggedIn, setLoggedIn] = useState(false)
    const navigate = useNavigate();

    const loginHandler = () => {
        authService.signinRedirect();
    }
    const logoutHandler = () => {
        authService.logout()
    }

    const getUser = async () => {
        var user = await authService.getUser()
        console.log("user is: ", user)
    }



    return (
        <div>
            <div>
                <nav>
                    <Link to="/"></Link>
                </nav>
                <Routes>
                    <Route path="/" element={<App />} />
                </Routes>

                <button onClick={loginHandler}>Test Login</button>
                <button onClick={logoutHandler}>Test LogOut</button>
                <button onClick={getUser} >Get User</button>
                <Grid container spacing={2} >
                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <button onClick={() => navigate(-1)}>Go back 1 Page</button>
                    </Grid>
                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <h1>Sign In</h1>
                    </Grid>
                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Link to="/">
                            <img src={homeimage} alt="home" height="35px" width="35px"></img>
                        </Link>
                    </Grid>
                </Grid>
                
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Form>

                        <FormGroup>
                            <Input
                                id="exampleEmail"
                                name="email"
                                placeholder="Email"
                                type="email"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Input
                                id="examplePassword"
                                name="password"
                                placeholder="Password"
                                type="password"
                            />
                        </FormGroup>

                        <div style={{display: 'flex', justifyContent: 'center' }}>
                            <Button>
                                Sign In
                            </Button>
                        </div>

                    </Form>
                </div>
            </div>

        </div >);




}


function App() {
    return (
        <div></div>);
}
