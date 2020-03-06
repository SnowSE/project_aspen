import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import theme from "../../theme";
import BeenhereOutlinedIcon from '@material-ui/icons/BeenhereOutlined';

const useStyles = makeStyles({
  rankingCard: {
    marginTop: 20,
    marginBottom: 20,
    marginRight: 20,
    maxHeight: "calc(100% - 40px)",
    display: "block"
  },
  list: {
    width: "100%",
    padding: 0
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.main,
    color: "white"
  },
  button: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    color: theme.palette.secondary.main
  },
  createTeam: {
    display: "block",
    marginTop: 15
  },
  title: {
    color: "white"
  }
});

interface RankingsProps{

}

const Rankings:React.FC<RankingsProps> = props => {
  const teams = [
    {
      teamName: "DiegoTeam"
    },
    {
      teamName: "MikeTeam"
    },
    {
      teamName: "BrandonTeam"
    },
    {
      teamName: "AlexTeam"
    },
    {
      teamName: "JonathanTeam"
    },
    {
      teamName: "KylerTeam"
    },
    {
      teamName: "KylerTeam"
    },
    {
      teamName: "KylerTeam"
    },
  ];
  const classes = useStyles();
  return (
    <div className={classes.rankingCard}>
      <Card>
        <CardHeader
          title={(<React.Fragment><BeenhereOutlinedIcon/> Top Teams</React.Fragment>)}
          classes={{ title: classes.title }}
          className={classes.cardHeader}
        />
        {teams
          ? teams.map(team => (
              <List
                component="nav"
                className={classes.list}
                aria-label="mailbox folders"
              >
                <ListItem button>
                  <ListItemText primary={team.teamName} />
                </ListItem>
                <Divider />
              </List>
            ))
          : "Loading..."}
      </Card>
      <Button className={classes.button} variant="outlined">
        Create a team
      </Button>
      <Button className={classes.button} variant="outlined">
        Join a team
      </Button>
    </div>
  );
};

export default Rankings;
