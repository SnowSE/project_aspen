import React, { Component } from 'react';
import {Box, 
        Button, 
        Typography, 
        Paper, 
        Link,} from '@mui/material';
import ReactPlayer from 'react-player';

import { LoginPage } from '../../components/LoginPage';
import Share from '../../components/Share';
import { DonationPage } from '../DonationPage/DonationPage';
import { useNavigate } from 'react-router-dom';

console.log("Public URL is:", `${process.env.PUBLIC_URL}`)

export function Home() {
    const navigate = useNavigate();
    return (
        <Box>
            <Paper square={true} sx={{backgroundColor:'#673ab7'}}>
                <Box sx={{display:'flex', justifyContent:'center'}}>
                    <Typography data-testid={"homePageHeader"} id={"homePageHeader"} variant='h5' sx={{fontWeight:'bold', color:'white'}}>Food Drive</Typography>
                    <Box sx={{display:'flex', justifyContent:'end'}}>
                        <Button 
                            onClick={() => navigate('/Login')} 
                            variant='contained' 
                            sx={{backgroundColor:'orange'}}>
                            SIGN IN
                        </Button>
                        <Share/>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <iframe width="780" height="400" src="https://www.youtube.com/embed/wkFlIx9sV04" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button 
                            onClick={() => navigate('/Donate')} 
                            variant='contained' 
                            sx={{ backgroundColor: 'orange', m: 2 }}>
                            DONATE MEALS
                        </Button>
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
