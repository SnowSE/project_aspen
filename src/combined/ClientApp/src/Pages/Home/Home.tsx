import React, { Component, useEffect } from 'react';
import {
    Box,
    Button,
    Typography,
    Paper,
    Link,
    Grid,
} from '@mui/material';
import ReactPlayer from 'react-player';

import Share from '../../components/Share';
import { DonationPage } from '../DonationPage/DonationPage';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import ProgressBar from '../../components/ProgressBar';
import TeamInfoModal from '../../components/TeamInfoModal';


export function Home() {



  

    const navigate = useNavigate();
    return (
        <Box>
            <Paper square={true} sx={{ backgroundColor: '#673ab7' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography data-testid={"homePageHeader"} id={"homePageHeader"} variant='h5' sx={{ fontWeight: 'bold', color: 'white' }}>Food Drive</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                        <Button
                            onClick={() => navigate('/Login')}
                            variant='contained'
                            sx={{ backgroundColor: 'orange' }}>
                            SIGN IN
                        </Button>
                        <Share data-testid={"shareBtn"} />
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <iframe
                        src="https://www.youtube.com/embed/wkFlIx9sV04"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        width="1000"
                        height="450"
                        allowFullScreen />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <ProgressBar />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        data-testid={'donateBtn'}
                        onClick={() => navigate('/Donate')}
                        variant='contained'
                        sx={{ backgroundColor: 'orange', m: 2 }}>
                        DONATE MEALS
                    </Button>
                    <Button variant='contained' sx={{ backgroundColor: 'orange', m: 2 }}>SHARE NOW</Button>
                </Box>
            </Paper>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h6' sx={{ fontSize: 20 }}>
                    2 Is Better Than 1
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography sx={{ fontSize: 15 }} paragraph={true}>
                    Studies show that when you work as a team, you are more productive, so why not join a team? The team who dontates the most meals can win some aswesome prizes!
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <TeamInfoModal />
            </Box>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant='contained' sx={{ backgroundColor: '#00b0ff', m: 2 }}>JOIN A TEAM</Button>
                    <Button variant='contained' sx={{ backgroundColor: '#00b0ff', m: 2 }} onClick={() => navigate('/createteam')}>CREATE A TEAM</Button>
                </Box>
            </Box>
        </Box>
    );
}
