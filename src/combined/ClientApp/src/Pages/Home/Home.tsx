import React, { Component, useEffect, useContext } from 'react';
import {
    Box,
    Button,
    Typography,
    Paper,
    Link,
    Grid,
} from '@mui/material';
import ReactPlayer from 'react-player';

import Share from '../../components/SharingIcon';
import { EventContext }  from '../../App';
import { DonationPage } from '../DonationPage/DonationPage';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import ProgressBar from '../../components/ProgressBar';
import TeamInfoModal from '../../components/TeamInfoModal';
import SharingIcon from '../../components/SharingIcon';
import SharingButton from '../../components/SharingButton';


export function Home() {

    console.log("window.location.origin is: ", window.location.origin)


    const navigate = useNavigate();
    const currentEvent = useContext(EventContext);

    return (

        <Box sx={{ pt: '4rem'} }>

            <Paper square={true} sx={{backgroundColor:'#673ab7'}}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography data-testid={"homePageHeader"} id={"homePageHeader"} variant='h5' sx={{fontWeight:'bold', color:'white'}}>Food Drive</Typography>
                    <Box sx={{display:'flex', justifyContent:'flex-end', alignItems: 'center'}}>
                        {/*<Button 
                            onClick={() => navigate('/Login')} 
                            variant='contained' 
                            sx={{backgroundColor:'orange'}}>
                            SIGN IN
                        </Button>
                        Render me later
                        */} 
                        <SharingIcon data-testid={"shareBtn"}/>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <iframe
                            data-testid={"homePageVideo"} id={"homePageVideo"}
                            src="https://www.youtube.com/embed/wkFlIx9sV04" 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            width= "1000"
                            height= "450"
                        allowFullScreen />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <ProgressBar/>
                </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Button 
                            data-testid="donateMealsBtn"
                            id={"donateMealsBtn"}
                            onClick={() => navigate('/Donate')} 
                            variant='contained' 
                            sx={{ backgroundColor: 'orange', m: 2 }}>
                            DONATE MEALS
                        </Button>
                        <SharingButton />
                    </Box>

            </Paper>
            <Paper square={true} sx={{ backgroundColor: '#eeeeee' }}>
            <Box sx={{display:'flex', justifyContent:'center'}}>
                <Typography variant='h6' sx={{fontSize: 20}}>
                    2 Is Better Than 1
                </Typography>
            </Box>
            <Box sx={{display:'flex', justifyContent:'center'}}>
                    <Typography sx={{ fontSize: 15, mx: 'auto', pl: 2 }} paragraph={true} >
                    Studies show that when you work as a team, you are more productive, so why not join a team? The team who dontates the most meals can win some aswesome prizes!
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <TeamInfoModal />
            </Box>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={() => navigate('\TeamsListPage')} variant='contained' sx={{ backgroundColor: '#00b0ff', m: 2 }}                            
                        data-testid={'joinATeamBtn'}
                        id={"joinATeamBtn"}>
                            JOIN A TEAM
                    </Button>
                    <Button variant='contained' sx={{ backgroundColor: '#00b0ff', m: 2 }} onClick={() => navigate('/createteam')}
                        data-testid={'createATeamBtn'}
                        id={"createATeamBtn"}>
                            CREATE A TEAM
                    </Button>
                </Box>
                </Box>
            </Paper>
            
            
        </Box>
    );
}
