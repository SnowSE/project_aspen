import { Button, Card, Grid } from '@mui/material';
import  React, {useState, useEffect} from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import Team from '../../JsModels/team';
import { authService } from '../../services/authService';
import axios from 'axios'

export const TeamCard = ({ id, name, description, mainImage, ownerID, eventID, donationTarget,persons }: Team) => {
    const navigate = useNavigate();
    //const user = authService.isLoggedIn();
    //{ localStorage.getItem("LoggedInUser") == "" ?}

    const BaseUrl = process.env.PUBLIC_URL
    const [loggedInUserId, setLoggedInUserId] = useState(0)

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        };
        const getUser = async () => {
            await axios.get(BaseUrl + '/api/user', config).then((response) => {
                setLoggedInUserId(response?.data?.id)
            }).catch((error)=> {
            })
        }

         getUser()
    })

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
                                                search: `?${createSearchParams({
                                                    teamId: `${id}`,
                                                    ownerID: `${ownerID}`
                                                })}`
                                            })
                                        }}
                                        sx={{ backgroundColor: 'orange', m: 2, fontSize: '10px' }}>Learn About Our Team</Button>
                                </Grid>
                                    {
                                        (() => {
                                                return (
                                                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', float: "right" }}>
                                                        <Button onClick={() => loggedInUSer ?
                                                            navigate({
                                                                pathname: "/LoggedInUser",
                                                                search: `?${createSearchParams({
                                                                    teamId: `${id}`,
                                                                    userId: `${loggedInUserId}`

                                                                })}`
                                                            })
                                                            : authService.signinRedirect()}
                                                            sx={{ backgroundColor: 'orange', m: 2, fontSize: '10px' }}  >Join Our Team</Button>
                                                    </Grid>
                                                )
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


