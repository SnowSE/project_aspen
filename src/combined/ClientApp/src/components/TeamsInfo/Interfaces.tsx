﻿import { Button, Card, Grid } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { TeamDetails } from './TeamDetails';

type Team = {
    id: number,
    name: string, 
    description: string,
    mainImage: string,
    ownerID: string,
    owner: string,
    eventID: string,
    donationTarget: number,
};



export const TeamCard = ({ id, name, description, mainImage, ownerID, owner, eventID, donationTarget }: Team) => {
    const navigate = useNavigate();
    //const user = authService.isLoggedIn();
    //{ localStorage.getItem("LoggedInUser") == "" ?}
    const loggedInUSer = localStorage.getItem("LoggedInUser")


    console.log("Am I logged in", loggedInUSer)
        return (
            <div style={{ paddingTop: "1rem", justifyContent: "flex-start" }}>
                <div className="d-flex justify-content-start" >
                    <div>
                        <Card style={{ width: "30rem" }}
                            onClick={() => {
                                navigate({
                                    pathname: '/TeamDetails',
                                    search: `?id=${id}`
                                })
                            }}
                        >
                            <div className="card text-start" style={{ backgroundColor: 'purple' }}>
                                <div className="card-header" style={{ fontSize: '50px', color: 'white' }}>{name}

                                  

                                </div>
                            </div>

                        </Card>
                        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', float: "right" }}>
                            <Button onClick={() => loggedInUSer ? navigate('/LoggedInUser') : navigate('/NotLoggedInUser')}
                                sx={{ backgroundColor: 'orange', m: 2, fontSize: '10px' }}  >Join Our Team</Button>
                        </Grid>
                    </div>
                </div>
            </div>

        );
    }
