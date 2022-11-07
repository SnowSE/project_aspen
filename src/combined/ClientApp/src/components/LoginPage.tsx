import React, { useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import homeimage from '../Images/home.png';
import { Grid } from "@mui/material"
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
export function LoginPage() {

    const navigate = useNavigate();

    return (
        <div>
            <div>
                <nav>
                    <Link to="/"></Link>
                </nav>
                <Routes>
                    <Route path="/" element={<App />} />
                </Routes>




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
