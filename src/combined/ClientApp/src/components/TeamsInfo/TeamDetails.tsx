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
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
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
  const [currentTeamRegisrtations, setCurrentTeamRegistrations] = useState<
    Registration[]
  >([]);

  useEffect(() => {
    const fetchTeam = async () => {
      const res = await fetch(api);
      const response = await res.json();
      setCurrentTeam(response);
      setCurrentTeamRegistrations(response.registrations);
    };
    const callServise = async () => {
      await fetchTeam();
    };

    callServise();
  }, [api]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

    const navigate = useNavigate();

    const loggedInUSer = localStorage.getItem("LoggedInUser")

    return (
        <div>   
           
            <h1>I am in Team details page</h1>
            <h1>I am in Team details page   {id}</h1>
            {currentTeam?.name}
            {currentTeam?.id}
            {currentTeam?.description}
            <img alt = "mainImage"src={baseImageUrl + currentTeam?.mainImage}/>
            {currentTeam?.ownerID}
            {currentTeam?.owner}
            {currentTeam?.eventID}
            {currentTeam?.donationTarget}  
            <ul>
                {currentTeamRegisrtations.map(r => <li key={r.id}> {r.nickname}</li>)}
            </ul>



            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', float: "right" }}>
                <Button onClick={() => loggedInUSer ? navigate('/LoggedInUser') : authService.signinRedirect()}
                    sx={{ backgroundColor: 'orange', m: 2, fontSize: '10px' }}  >Join Our Team</Button>
            </Grid>



        </div>
    );
}
