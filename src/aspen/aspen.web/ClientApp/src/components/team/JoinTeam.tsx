import React, { useEffect, useState } from 'react';
import {LoggerService} from "../../services/LoggerService"
import { APIService } from "../../services/APIService";
import { DomainService } from "../../services/DomainService";
import { Team } from "../../models/TeamModel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const JoinTeam = () => {
    const [teams1, setTeams1] = useState<Team[]>([]);

    const getteams = async() =>{
        let apiservice = new APIService(new DomainService(),new LoggerService());
        let charity  = await apiservice.GetCharityByDomain();
        let teams = await apiservice.GetTeamByCharityID(charity.ID);
        setTeams1(teams);
    }

    useEffect(() => {
        getteams();
      }, []);

    return (
        <div>
            <h3>Join a team</h3>
                {teams1 ?
                    teams1.map(team => (
                        <List>
                            <ListItem button>
                                <ListItemText primary={team.Name} />
                            </ListItem>
                            <Divider />                        
                        </List>  
                      ))
                    : "Loading..."
                }                
        </div>
    );
}

export default JoinTeam;