import {
  Box,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import Person from "../../JsModels/person";
import Registration from "../../JsModels/registration";
import { authService } from "../../services/authService";
import * as React from "react";
import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import SharingIcon from "../../components/Share/SharingIcon";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ProgressBar from "../ProgressBar";

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
  const id = searchParams.get("id");

    const api = process.env.PUBLIC_URL + `/api/teams/${id}`;
    const [currentTeam, setCurrentTeam] = useState<any>();
    const [currentTeamRegisrtations, setCurrentTeamRegistrations] = useState <Registration[]>([]);
    const [teamOwner, setTeamOwner] = useState<Person>();
    const personApi = process.env.PUBLIC_URL + `/api/Person/${currentTeam?.ownerID}`;

  useEffect(() => {
    const fetchTeam = async () => {
        const res = await fetch(api)
        const response = await res.json()

        const person = await fetch(api)
        const teamOwner = await person.json()
        setCurrentTeam(response)
        setCurrentTeamRegistrations(response.registrations)
        setTeamOwner(teamOwner)
    }
    const callServise = async () => {
      await fetchTeam();
    };

    callServise();
  }, [api]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const navigate = useNavigate();
  const loggedInUSer = localStorage.getItem("LoggedInUser");
  return (
    <Box>
      <Button
        onClick={() =>
          loggedInUSer
            ? navigate({
                pathname: "/LoggedInUser",
                search: `?${createSearchParams({
                  id: `${id}`,
                  ownerID: `${currentTeam?.ownerID}`,
                })}`,
              })
            : authService.signinRedirect()
        }
        sx={{ backgroundColor: "orange", m: 2, fontSize: "10px" }}
      >
        Join Our Team
      </Button>
      {currentTeam?.id}
      {currentTeam?.ownerID}
      {currentTeam?.owner}
      {currentTeam?.eventID}
      <Box sx={{display:'flex', justifyContent:'center'}}>
        <Card sx={{ maxWidth: 500 }}>
          <CardHeader
            title={currentTeam?.name}
            subheader={"Donation Target: "+ currentTeam?.donationTarget + "Meals"}
          />
          <CardMedia
            component="img"
            height="250"
            image={baseImageUrl + currentTeam?.mainImage}
            alt="mainImage"
          />
          <CardContent>
            <Box
              className="ProgressBarPosition"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <ProgressBar />
            </Box>
            <Typography variant="body2" color="text.secondary">
              {currentTeam?.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <SharingIcon data-testid={"shareBtn"} />
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
            <CardContent>
              <Typography paragraph>Members:</Typography>
              <Typography paragraph>
                There are {currentTeamRegisrtations.length} members on this
                team!
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
