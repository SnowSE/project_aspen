import { Grid } from '@mui/material';
import React, { Component } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';


export function TeamsListPage() {
    const navigate = useNavigate();

    //const { isLoading, error, data } = EventsHooks.useEventsQuery();


    return (
        <div>'
            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={() => navigate(-1)}>Go back 1 Page</button>
            </Grid>
            <h1>Existing Teams</h1>
            <p>I am here</p>
        </div>
    );
};