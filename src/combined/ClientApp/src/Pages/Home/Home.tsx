import React, { useEffect, useContext} from 'react';
import {
    Box,
    Button,
    Typography,
    Paper
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { EventContext } from '../../App';
import ProgressBar from '../../components/ProgressBar';
import TeamInfoModal from '../../components/Team/TeamInfoModal';
import SharingIcon from '../../components/Share/SharingIcon';
import SharingButton from '../../components/Share/SharingButton';



export function Home() {

    const navigate = useNavigate();
    const { currentEvent } = useContext(EventContext);

    useEffect(() => {
 
    }, []);

    return (
        <Box>
            <Paper square={true} className="PaperColor">
                <Box className = "CurrentEventPosition">
                    <Typography data-testid={"homePageHeader"} id={"homePageHeader"} className="CurrentEventTextDetails">
                        {currentEvent?.title}
                    </Typography>
                    <Box className="ShareIconPosition">
                        <SharingIcon data-testid={"shareBtn"} />
                    </Box>
                </Box>
                <Box className="YoutubePlayerPosition">
                    <iframe
                        data-testid={"homePageVideo"} id={"homePageVideo"}
                        src="https://www.youtube.com/embed/wkFlIx9sV04"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        width="1000"
                        height="450"
                        allowFullScreen />
                </Box>
                <Box className="ProgressBarPosition">
                    <ProgressBar />
                </Box>
                <Box className="DonateButtonPosition">
                    <Button
                        data-testid="donateMealsBtn"
                        id={"donateMealsBtn"}
                        onClick={() => navigate('/Donate')}
                        variant='contained'
                        className = "DonateButtonDetails">
                        DONATE MEALS
                    </Button>
                    <SharingButton />
                </Box>

            </Paper>
            <Paper square={true} className="SecondaryPaperColor">
                <Box className="SubTextHeaderPosition">
                    <Typography className="SubTextHeaderDetails">
                        2 Is Better Than 1
                    </Typography>
                </Box>
                <Box className="SubTextBodyPosition">
                    <Typography className= "SubTextBodyDetails" paragraph={true} >
                        Studies show that when you work as a team, you are more productive, so why not join a team? The team who dontates the most meals can win some aswesome prizes!
                    </Typography>
                </Box>
                <Box className="TeamInfoModalPosition">
                    <TeamInfoModal />
                </Box>
                <Box>
                    <Box className="TeamButtonPositions">
                        <Button onClick={() => navigate("/TeamsListPage")} variant='contained' className="JoinTeamButtonDetails"
                            data-testid={'joinATeamBtn'}
                            id={"joinATeamBtn"}>
                            JOIN A TEAM
                        </Button>
                        <Button variant='contained' className="CreateTeamButtonDetails" onClick={() => navigate('/createteam')}
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
