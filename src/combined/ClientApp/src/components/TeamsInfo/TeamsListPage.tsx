import { Button, Grid } from '@mui/material';
import React, { useEffect, useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeamCard } from './Interfaces';
import { getTeamsList } from './TeamServices';
import { EventContext } from '../../App';


export function TeamsListPage() {
    const navigate = useNavigate();
    const currentEvent = useContext(EventContext);
    const [teamsList, setTeams] = useState<typeof TeamCard[]>([]);
    
    async function settingTeamsList() {
        if (!currentEvent.id) {
            console.log("No current event found!")
            return;
        }
      
        const teams = await getTeamsList(currentEvent.id)
        setTeams(teams)
    };
    
    const callService = async () => {
            await settingTeamsList();
    }
    
    useEffect(() => {
        callService()
    }, [])
    
    return (
        <div>'
            <Grid item xs={4} sx={{
                display: 'flex', justifyContent: 'flex-start', }}>
                <Button sx={{ backgroundColor: '#FFF500', m: 2 }} onClick={() => navigate(-1)}>Go back 1 Page</Button>
            </Grid>
            <h1>Existing {teamsList.length} Teams  </h1>
            
            {teamsList.map((t: any, id) => {
                return (
                    //<TeamDetails t={t} key={id }/>
                     <TeamCard
                        name={t.name}
                        id={t.id}
                        description={t.description}
                        mainImage={t.mainImage}
                        ownerID={t.ownerID}
                        owner={t.owner}
                        eventID={t.eventID}
                        donationTarget={t.donationTarget}
                        key={t.id}

                    /> 

                )
            })}        
           
        </div>
    );
};