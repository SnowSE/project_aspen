import React, { Component } from 'react';
import {Box, 
        Button, 
        Typography, 
        Paper,
        IconButton, 
        Link} from '@mui/material';

import { LoginPage } from '../components/LoginPage';
import Share from '../components/Share';

export function Home() {
    return (
        <Box>
            <Paper square={true} sx={{backgroundColor:'#673ab7'}}>
                <Box sx={{display:'flex', justifyContent:'center'}}>
                    <Typography variant='h5' sx={{fontWeight:'bold', color:'white'}}>Food Drive</Typography>
                    <Box sx={{display:'flex', justifyContent:'end'}}>
                        <Button onClick={LoginPage} variant='contained' sx={{backgroundColor:'orange'}}>SIGN IN</Button>
                        <Share/>
                    </Box>
                </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant='contained' sx={{ backgroundColor: 'orange', m: 2 }}>DONATE MEALS</Button>
                        <Button variant='contained' sx={{ backgroundColor: 'orange', m: 2 }}>SHARE NOW</Button>
                    </Box>
            </Paper>

            <Box sx={{display:'flex', justifyContent:'center'}}>
                <Typography variant='h6' sx={{fontSize: 20}}>
                    2 Is Better Than 1
                </Typography>
            </Box>
            <Box sx={{display:'flex', justifyContent:'center'}}>
                <Typography sx={{fontSize: 15}} paragraph={true}>
                    Studies show that when you work as a team, you are more productive, so why not join a team? The team who dontates the most meals can win some aswesome prizes!
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Link href="#">Learn More About Teams</Link>
            </Box>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant='contained' sx={{ backgroundColor: '#00b0ff', m: 2 }}>JOIN A TEAM</Button>
                    <Button variant='contained' sx={{ backgroundColor: '#00b0ff', m: 2 }}>CREATE A TEAM</Button>
                </Box>
            </Box>

        </Box>
    );
}
