import React, { Component } from 'react';
import {Box, 
        Button, 
        Typography, 
        Paper, 
        Link,
        Grid,} from '@mui/material';
import ReactPlayer from 'react-player';

import { LoginPage } from '../../components/LoginPage';
import Share from '../../components/Share';
import { DonationPage } from '../DonationPage/DonationPage';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar';



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
                <ReactPlayer 
                    width={'80%'} 
                    height='100%'
                    url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
                    playing={true}
                    muted={true}
                    controls={true}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <ProgressBar />
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
