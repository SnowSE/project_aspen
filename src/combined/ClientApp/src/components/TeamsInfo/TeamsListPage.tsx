﻿import { Button, Grid } from '@mui/material';
import React, { Component, useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { TeamCard } from './Interfaces';
import { TeamDetails } from './TeamDetails';
import { getTeamsList } from './TeamServices';


export function TeamsListPage() {
    const navigate = useNavigate();

    //const { isLoading, error, data } = EventsHooks.useEventsQuery();
    const [teamsList, setTeams] = useState<typeof TeamCard[]>([]);
    async function settingTeamsList() {
        const teams = await getTeamsList()
        console.log('I am  in teams',teams)

        setTeams(teams)
    };


    useEffect(() => {
        console.log('in useeffect')
        const callService = async () => {
            await settingTeamsList();
        }
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
                        registrations={t.registrations }
                        key={t.id}

                    /> 

                )
            })}        
           
        </div>
    );
};