import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
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
import {LoggerService} from "../../services/LoggerService"
import { APIService } from "../../services/APIService";
import { DomainService } from "../../services/DomainService";
import { Team } from "../../models/TeamModel";
import { Theme } from "../../models/Theme";

interface RankingsProps{
  theme: Theme
}

const Rankings:React.FC<RankingsProps> = props => {
const [teams1, setTeams1] = useState<Team[]>([]);

const getteams = async() =>{
  let apiservice = new APIService(new DomainService(),new LoggerService());
  let charity  = await apiservice.GetCharityByDomain();
  let teams = await apiservice.GetTeamByCharityID(charity.ID);
  setTeams1(teams);
}
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
      backgroundColor: props.theme.palette.primary.main,
      color: "white"
    },
    button: {
      width: "100%",
      marginTop: 10,
      marginBottom: 10,
      color: props.theme.palette.secondary.main
    },
    createTeam: {
      display: "block",
      marginTop: 15
    },
    title: {
      color: "white"
    }
  };
  useEffect(() => {
    getteams();
  }, []);

  return (
    <div style={classes.rankingCard}>
      <Card>
        <CardHeader
          title={(<React.Fragment><BeenhereOutlinedIcon/> Top Teams</React.Fragment>)}
          style={{...classes.cardHeader, ...classes.title}}
        />
        {teams1
          ? teams1.map(team => (
              <List
                component="nav"
                style={classes.list}
                aria-label="mailbox folders"
              >
                <ListItem button>
                  <ListItemText primary={team.Name} />
                </ListItem>
                <Divider />
              </List>
            ))
          : "Loading..."}
          </Card>
     
        <Link to="/createteam">
          <Button style={classes.button} variant="outlined">
            Create a team
          </Button>
        </Link >
      <Button style={classes.button} variant="outlined">
        Join a team
      </Button>
    </div>
  );
};

const mapStateToProps = (state: ApplicationState) => {
  return {
      theme: state.charity.theme
  }
}

export default connect(
  mapStateToProps
)(Rankings);
