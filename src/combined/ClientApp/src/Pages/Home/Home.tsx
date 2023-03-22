import React, { useEffect, useContext, useState} from 'react';
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
import { DonateButton } from '../../components/DonateButton';
import SharingButtonCustomLink from '../../components/Share/SharingButtonCustomLink';
import axios from 'axios';



export function Home() {

    const navigate = useNavigate();
    const { currentEvent } = useContext(EventContext);
    const [donationsTotal, setdonationsTotal] = useState<number>(0.0);
    const [progressBarIsUptodate, setprogressBarIsUptodate] = useState<boolean>(false);


    const getDonationTotal = async () => {
        const response = await axios.get( `api/donations/event/${currentEvent?.id}`);
        const data = response.data;
        setdonationsTotal(data);
        setprogressBarIsUptodate(true);
    }

    useEffect(() => {
        getDonationTotal();
    }, [currentEvent?.donationTarget, progressBarIsUptodate]);

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
                    {progressBarIsUptodate && (
                        <ProgressBar currentTotal={donationsTotal} goalTotal={currentEvent?.donationTarget} />
                    )}
                </Box>
                <Box className="DonateButtonPosition">
                    <SharingButtonCustomLink />
                    <DonateButton />
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
                        Studies show that when you work as a team, you are more productive, so why not join a team? The team who dontates the most can win some awesome prizes!
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
