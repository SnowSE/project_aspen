import {Box,Button,Card,CardHeader,CardMedia,CardContent,CardActions,Collapse,Typography, Grid,} from "@mui/material";
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
import axios from "axios";
import { User } from "../../JsModels/user";
import { JoinTeamRestriction } from "./joinTeamRestriction";

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
    const [currentUSer, setCurrentUser] = useState<any>();


    const personApi = process.env.PUBLIC_URL + `/api/Person/${ownerId}`;
    var currentUserUrl = process.env.PUBLIC_URL + "/api/User"
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
    };


  useEffect(() => {
    const fetchTeam = async () => {
        const res = await fetch(api)
        const response = await res.json()
        setCurrentTeam(response)
        setCurrentTeamRegistrations(response.registrations)   
        const user = await axios.get(currentUserUrl, config)
        console.log("I am the current user", typeof(user.data.id));

        const curUser= Number(user.data.id)
        setCurrentUser(curUser);
        

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
        await fetchTeam();
        await fetchTeamOwner();

    };
      callServise();
  }, [api, personApi, currentUserUrl]);
    

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const navigate = useNavigate();
    const loggedInUSer = localStorage.getItem("LoggedInUser");
    console.log("currentUser", currentUSer);
  return (
      <Box>
          <CardContent>
              <Typography paragraph>Members:</Typography>
              <Typography paragraph>
                  The Team owner is: {teamOwner?.name}         
                 
              </Typography>
          </CardContent>

          { (() => {
                  if (currentTeam?.isPublic === true) {
                      return (
                          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', float: "right" }}>
                              <Button
                                  onClick={() =>
                                      loggedInUSer
                                          ? navigate({
                                              pathname: "/LoggedInUser",
                                              search: `?${createSearchParams({
                                                  id: `${tId}`,
                                                  ownerID: `${currentTeam?.ownerID}`,
                                              })}`,
                                          })
                                          : authService.signinRedirect()
                                  }
                                  sx={{ backgroundColor: "orange", m: 2, fontSize: "10px" }}
                              >
                                  Join Our Team
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
      
      {currentTeam?.id}
      {currentTeam?.ownerID}
      {currentTeam?.owner}
          {currentTeam?.eventID}
          <JoinTeamRestriction id={currentUSer} />

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
          </Collapse>
        </Card>
      </Box>
    </Box>
  );
}
