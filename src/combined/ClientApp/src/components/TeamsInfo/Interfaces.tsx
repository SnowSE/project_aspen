import { Button, Card, Grid } from '@mui/material';
import * as React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import Registration from '../../JsModels/registration';
import { authService } from '../../services/authService';
import { LoggedInUser } from './LoggedInUser';
import { TeamDetails } from './TeamDetails';

export type Team = {
    id: number,
    name: string, 
    description: string,
    mainImage: string,
    ownerID: string,
    owner: string,
    eventID: string,
    donationTarget: number,
    registrations: Registration[]
};

export const TeamCard = ({ id, name, description, mainImage, ownerID, owner, eventID, donationTarget, registrations }: Team) => {
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
                           
                        >
                            <div className="card text-start" style={{ backgroundColor: 'purple' }}>
                                <div className="card-header" style={{ fontSize: '50px', color: 'white' }}>{name}

                                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', float: "right" }}>
                                        <Button onClick={() => {
                                            navigate({
                                                pathname: '/TeamDetails',
                                                search: `?id=${id}`
                                            })
                                        }}
                                        sx={{ backgroundColor: 'orange', m: 2, fontSize: '10px' }}>Learn About Our Team</Button>
                                </Grid>

                                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', float: "right" }}>
                                        <Button onClick={() => loggedInUSer ?
                                            navigate({
                                                pathname: "/LoggedInUser",
                                                search: `?${createSearchParams({
                                                    id:`${id}`,
                                                    ownerID: `${ownerID}`

                                                })}`
                                            })
                                            : authService.signinRedirect()}
                                        sx={{ backgroundColor: 'orange', m: 2, fontSize: '10px' }}  >Join Our Team</Button>
                                </Grid>

                                  

                                </div>
                            </div>

                        </Card>
                       
                    </div>
                </div>
            </div>

        );
    }
