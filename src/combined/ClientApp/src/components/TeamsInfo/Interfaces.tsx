import { Button, Card, Grid } from '@mui/material';
import * as React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import Team from '../../JsModels/team';
import { authService } from '../../services/authService';


export const TeamCard = ({ id, name, description, mainImage, ownerID, eventID, donationTarget, isPublic, registrations }: Team) => {
    const navigate = useNavigate();
    //const user = authService.isLoggedIn();
    //{ localStorage.getItem("LoggedInUser") == "" ?}
    const loggedInUSer = localStorage.getItem("LoggedInUser")
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
                                    {
                                        (() => {
                                            if (id === id && isPublic===true) {
                                                return (
                                                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', float: "right" }}>
                                                        <Button onClick={() => loggedInUSer ?
                                                            navigate({
                                                                pathname: "/LoggedInUser",
                                                                search: `?${createSearchParams({
                                                                    id: `${id}`,
                                                                    ownerID: `${ownerID}`

                                                                })}`
                                                            })
                                                            : authService.signinRedirect()}
                                                            sx={{ backgroundColor: 'orange', m: 2, fontSize: '10px' }}  >Join Our Team</Button>
                                                    </Grid>
                                                )
                                            }  else {
                                                return (
                                                    <p>This is Private Team</p>
                                                )
                                            }
                                        })()
                                    }  
                                   

                                  

                                </div>
                            </div>

                        </Card>
                       
                    </div>
                </div>
            </div>

        );
    }
