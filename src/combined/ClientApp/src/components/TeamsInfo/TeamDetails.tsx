import {Box,Button,Card,CardHeader,CardMedia,CardContent,CardActions,Collapse,Typography, Grid, Divider,} from "@mui/material";
import { useEffect, useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import Person from "../../JsModels/person";
import Registration from "../../JsModels/registration";
import { authService } from "../../services/authService";
import * as React from "react";
import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ProgressBar from "../ProgressBar";
import SharingIcon from "../Share/SharingIcon";
import axios from 'axios'
import { DonateButton } from "../DonateButton";
import { right } from "@popperjs/core";


interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function TeamDetails() {
  const [expanded, setExpanded] = React.useState(false);
  const baseImageUrl = process.env.PUBLIC_URL + "/assets/";

  const [searchParams] = useSearchParams();
  const list=[]
    for (var entry of searchParams.entries()) {
        console.log(entry[1]);
        list.push(entry[1])
    }        
    var tId = parseInt(list[0]);
    if (list[0] !== null) {
       tId = parseInt(list[0]);   // parse the string back to a number.
    }   
    var ownerId = parseInt(list[1]);
    if (list[1] !== null) {
        ownerId =parseInt(list[1]);   // parse the string back to a number.
    }


    const api = process.env.PUBLIC_URL + `/api/teams/${tId}`;
    const [currentTeam, setCurrentTeam] = useState<any>();
    const [currentTeamRegisrtations, setCurrentTeamRegistrations] = useState <Registration[]>([]);
    const [teamOwner, setTeamOwner] = useState<Person>();
    const [loggedInUserId, setLoggedInUserId] = useState<number>();
    const personApi = process.env.PUBLIC_URL + `/api/Person/${ownerId}`;
    
    useEffect(() => {
    const BaseUrl = process.env.PUBLIC_URL
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
  };

    const fetchTeam = async () => {
        const res = await fetch(api)
        const response = await res.json()
        setCurrentTeam(response)
        setCurrentTeamRegistrations(response.registrations)       
        
      }


    const getUser = async () => {
        await axios.get(BaseUrl + '/api/user', config).then((response) => {
            setLoggedInUserId(response?.data?.id)
        }).catch((error)=> {
        })
    }

      const fetchTeamOwner = async () => {
          try {
              const person = await fetch(personApi)
              const teamOwner = await person.json()
              setTeamOwner(teamOwner)

          } catch (e) {
              console.log(e);
          }
          
      }
    const callServise = async () => {
        await getUser()
        await fetchTeam();
        await fetchTeamOwner();
    };

      callServise();
  }, [api, personApi]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const navigate = useNavigate();
    const loggedInUSer = localStorage.getItem("LoggedInUser");
   
    console.log("Logged in user id:", loggedInUserId);
  return (
      <Box>
          <Box>
              <Typography variant="h1">{currentTeam?.name}</Typography>
              <Typography paragraph>By: {currentTeam?.teamowner}</Typography>
              <Box sx={{display: 'flex', justifyContent: 'right'} }>
                  {(() => {
                      if (loggedInUserId === teamOwner?.id) {
                          return (
                              <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', float: "right" }}>
                                  <Button
                                      onClick={() =>
                                        navigate({
                                                  pathname: "/EditTeam",
                                                  search: `?${createSearchParams({
                                                      teamId: `${tId}`,
                                                      userId: `${loggedInUserId}`,
                                                  })}`,
                                              })
                                    
                                      }
                                      sx={{ backgroundColor: "orange", m: 2, fontSize: "10px" }}
                                  >
                                      Edit Team Details
                                  </Button>
                              </Grid>
                          )
                      } 
                  })()
                  }
                  {(() => {
                      if (loggedInUserId === teamOwner?.id) {
                          return (
                              <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', float: "right" }}>
                                  <Button
                                      onClick={() =>
                                          navigate({
                                              pathname: "/DeleteTeam",
                                              search: `?${createSearchParams({
                                                  teamId: `${tId}`,
                                                  userId: `${loggedInUserId}`,
                                              })}`,
                                          })

                                      }
                                      sx={{ backgroundColor: "orange", m: 2, fontSize: "10px" }}
                                  >
                                      Delete Team
                                  </Button>
                              </Grid>
                          )
                      }
                  })()
                  }  

              </Box>
              <Divider />
          </Box>
          <ul>
              {currentTeamRegisrtations.map((registration) =>
                  registration.isPublic === true ?
                      <li key={registration.id}> {registration.nickname}</li>
                      : <li>Anonymous User</li>)}
          </ul>
                  <h4>There are {currentTeamRegisrtations.length} members on this
                      team!</h4>

            

          
      
      {currentTeam?.id}
      {currentTeam?.ownerID}
      {currentTeam?.owner}
          {currentTeam?.eventID}
          <CardHeader
              className="PaperColor"
              sx={{ color: "white" }}
              title={currentTeam?.name}
              subheader={
                  <Typography sx={{ color: "white" }}>
                      {" "}
                      Donation Target: ${currentTeam?.donationTarget} Meals{" "}
                  </Typography>
              }
          />
          <Box sx={{ display: 'flex', justifyContent: 'left' }}>
              <Box>
                <Typography sx={{ maxWidth: 800, height: 200, overflow: "auto", scrollBehavior: "smooth" }}>
                  {currentTeam?.description}
                </Typography>
              </Box>
          
          <CardMedia
            component="img"
            height="250"
            image={baseImageUrl + currentTeam?.mainImage}
            alt="mainImage"
          />
          <Box className="PaperColor">
            <Box className="ProgressBarPosition">
              <ProgressBar />
              <SharingIcon data-testid={"shareBtn"} />
            </Box>
            <Box className= "DonateButtonPosition">
                <DonateButton />
            </Box>
          </Box>
          </Box>
                  {(() => {
                      if (currentTeam?.isPublic === true) {
                          return (
                              <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', float: "right" }}>
                                  <Button
                                      onClick={() =>
                                          loggedInUSer
                                              ? navigate({
                                                  pathname: "/LoggedInUser",
                                                  search: `?${createSearchParams({
                                                      teamId: `${tId}`,
                                                      userId: `${loggedInUserId}`,
                                                  })}`,
                                              })
                                              : authService.signinRedirect()
                                      }
                                      sx={{ backgroundColor: "orange", m: 2, fontSize: "10px" }}
                                  >
                                      Join Our Team!
                                  </Button>
                              </Grid>
                          )
                      } else {
                          return (
                              <p>This is Private Team</p>
                          )
                      }
                  })()
          }
          <Box sx={{ display: 'flex', justifyContent: 'right' }}>
              <Card>
                  <CardContent>
                      <Typography paragraph sx={{ color: "white" }}>
                          There are {currentTeamRegisrtations.length} members on this
                          team!
                          <Typography paragraph sx={{ color: "white" }}>
                              Members:
                          </Typography>
                          <ul>
                              {currentTeamRegisrtations.map(
                                  (registration) =>
                                      registration.isPublic === true && (
                                          <li key={registration.id}> {registration.nickname}</li>
                                      )
                              )}
                          </ul>
                      </Typography>
                  </CardContent>
              </Card>
          </Box>
    </Box>
  );
}
