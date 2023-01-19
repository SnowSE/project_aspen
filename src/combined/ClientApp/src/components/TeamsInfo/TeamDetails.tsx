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
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Person from "../../JsModels/person";
import Registration from "../../JsModels/registration";
import { authService } from "../../services/authService";
import * as React from "react";
import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ProgressBar from "../ProgressBar";
import SharingIcon from "../Share/SharingIcon";

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
  const list = [];
  for (var entry of searchParams.entries()) {
    console.log(entry[1]);
    list.push(entry[1]);
  }
  var tId = parseInt(list[0]);
  if (list[0] !== null) {
    tId = parseInt(list[0]); // parse the string back to a number.
  }
  var ownerId = parseInt(list[1]);
  if (list[1] !== null) {
    ownerId = parseInt(list[1]); // parse the string back to a number.
  }

  const api = process.env.PUBLIC_URL + `/api/teams/${tId}`;
  const [currentTeam, setCurrentTeam] = useState<any>();
  const [currentTeamRegisrtations, setCurrentTeamRegistrations] = useState<
    Registration[]
  >([]);
  const [teamOwner, setTeamOwner] = useState<Person>();
  const personApi = process.env.PUBLIC_URL + `/api/Person/${ownerId}`;

  useEffect(() => {
    const fetchTeam = async () => {
      const res = await fetch(api);
      const response = await res.json();
      setCurrentTeam(response);
      setCurrentTeamRegistrations(response.registrations);
    };
    const fetchTeamOwner = async () => {
      try {
        const person = await fetch(personApi);
        const teamOwner = await person.json();
        setTeamOwner(teamOwner);
      } catch (e) {
        console.log(e);
      }
    };
    const callServise = async () => {
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
  return (
    <Box>
      {(() => {
        if (currentTeam?.isPublic === true) {
          return (
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                float: "right",
              }}
            >
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
          );
        } else {
          return <p>This is Private Team</p>;
        }
      })()}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card sx={{ maxWidth: 500 }}>
          <CardHeader
            data-testid={"TeamDetailsPageHeader"}
            className="PaperColor"
            sx={{ color: "white" }}
            title={currentTeam?.name}
            subheader={
              <Typography
                sx={{ color: "white" }}
                data-testid={"TeamDonationTarget"}
              >
                Donation Target: ${currentTeam?.donationTarget} Meals
              </Typography>
            }
          />
          <CardMedia
            data-testid={"TeamImage"}
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
            <Typography data-testid={"TeamDescription"} variant="body2">
              {currentTeam?.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <ExpandMore
              data-testid={"TeamExpandContent"}
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
                The Team owner is: {teamOwner?.name}
              </Typography>
              <Typography
                data-testid={"NumberOfMembers"}
                paragraph
                sx={{ color: "white" }}
              >
                There are {currentTeamRegisrtations.length} members on this
                team!
              </Typography>
              <Typography
                data-testid={"MembersHeader"}
                paragraph
                sx={{ color: "white" }}
              >
                Members:
              </Typography>
              <Typography data-testid={"ListOfMembers"} paragraph>
                <ul>
                  {currentTeamRegisrtations.map((registration) =>
                    registration.isPublic === true ? (
                      <li key={registration.id}> {registration.nickname}</li>
                    ) : (
                      <li>ananymous team member</li>
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
