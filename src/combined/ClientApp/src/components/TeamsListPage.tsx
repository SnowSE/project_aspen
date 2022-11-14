import { Grid } from '@mui/material';
import React, { Component, useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { Team } from './Interfaces';
import { getTeamsList } from './TeamServices';


export function TeamsListPage() {
    const navigate = useNavigate();

    //const { isLoading, error, data } = EventsHooks.useEventsQuery();
    const [teamsList, setTeams] = useState<Team[]>([]);
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
            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={() => navigate(-1)}>Go back 1 Page</button>
            </Grid>
            <h1>Existing {teamsList.length} Teams  </h1>
            <ul>
                {teamsList.map((t) => (<li key={t.name}>{t.name}</li>))}          
            </ul>
           
        </div>
    );
};