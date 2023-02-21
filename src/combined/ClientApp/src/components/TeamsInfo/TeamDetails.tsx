import {Box,Button,Card,CardHeader,CardMedia,CardContent,CardActions,Collapse,Typography, Grid,} from "@mui/material";
import { useEffect, useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import Person from "../../JsModels/person";
import { authService } from "../../services/authService";
import * as React from "react";
import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ProgressBar from "../ProgressBar";
import SharingIcon from "../Share/SharingIcon";
import axios from 'axios'
import { DonateButton } from "../DonateButton";


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
    const [teamOwner, setTeamOwner] = useState<Person>();
    const [loggedInUserId, setLoggedInUserId] = useState<number>();
    
    
    useEffect(() => {
    const BaseUrl = process.env.PUBLIC_URL
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
  };

    const fetchTeam = async () => {
        const res = await fetch(api)
        const response = await res.json()
        //console.log("response is: ", response)
        //ownerId = response.ownerID;
        setCurrentTeam(response)
        
      }


    const getUser = async () => {
        await axios.get(BaseUrl + '/api/user', config).then((response) => {
            setLoggedInUserId(response?.data?.id)
        }).catch((error)=> {
          console.log("There was an error retrieving user", error)
        })
    }

      const fetchTeamOwner = async () => {
          try {
              var personApi = process.env.PUBLIC_URL + `/api/Person/${ownerId}`;
              const person = await fetch(personApi)
              const teamOwner = await person.json()
              console.log("Team owner object is: ", teamOwner)
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
  }, [api, ownerId]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const navigate = useNavigate();
    const loggedInUSer = localStorage.getItem("LoggedInUser");
   
    console.log("Logged in user id:", loggedInUserId);
    console.log("Current team object is: ", currentTeam);
    console.log("current team owner id is: ", currentTeam?.ownerID);
    console.log("current loggedInUserIDis: ", loggedInUserId);
  return (
      <Box>
          <CardContent>
              <Typography paragraph>Members:</Typography>
              <Typography paragraph>
                  <h4>The Team owner is: {teamOwner?.name}</h4>

                  
              </Typography>
          </CardContent>

          {currentTeam?.isPublic === true ?
                      
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
                                  Join Our Team
                              </Button>
                          </Grid>
                                  : <p>This is Private Team</p> } 

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
      
      
      <Box sx={{display:'flex', justifyContent:'center'}}>
        <Card sx={{ maxWidth: 500 }}>
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
          <CardMedia
            component="img"
            height="250"
            image={baseImageUrl + currentTeam?.mainImage}
            alt="mainImage"
          />
          <CardContent className="PaperColor">
            <Box className="ProgressBarPosition">
              <ProgressBar />
              <SharingIcon data-testid={"shareBtn"} />
            </Box>
            <Box className= "DonateButtonPosition">
                <DonateButton />
            </Box>
          </CardContent>
          <CardContent>
            <Typography variant="body2">{currentTeam?.description}</Typography>
          </CardContent>
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent className="PaperColor">
              
            </CardContent>
          </Collapse>
        </Card>
      </Box>
    </Box>
  );
}
