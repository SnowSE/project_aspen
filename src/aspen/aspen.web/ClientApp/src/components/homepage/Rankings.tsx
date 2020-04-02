import React from "react";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import BeenhereOutlinedIcon from '@material-ui/icons/BeenhereOutlined';
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import * as ThemeStore from "../../store/Theme";
import { bindActionCreators } from "redux";

interface RankingsInterface{

}

type RankingsProps = ThemeStore.ThemeState & typeof ThemeStore.actionCreators & RankingsInterface;

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
  const classes = {
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
      backgroundColor: props.palette.primary.main,
      color: "white"
    },
    button: {
      width: "100%",
      marginTop: 10,
      marginBottom: 10,
      color: props.palette.secondary.main
    },
    createTeam: {
      display: "block",
      marginTop: 15
    },
    title: {
      color: "white"
    }
  };

  return (
    <div style={classes.rankingCard}>
      <Card>
        <CardHeader
          title={(<React.Fragment><BeenhereOutlinedIcon/> Top Teams</React.Fragment>)}
          style={{...classes.cardHeader, ...classes.title}}
        />
        {teams
          ? teams.map(team => (
              <List
                component="nav"
                style={classes.list}
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
      <Button style={classes.button} variant="outlined">
        Create a team
      </Button>
      <Button style={classes.button} variant="outlined">
        Join a team
      </Button>
    </div>
  );
};

export default connect(
  (state: ApplicationState) => state.theme,
  dispatch => bindActionCreators(ThemeStore.actionCreators, dispatch)
)(Rankings);
