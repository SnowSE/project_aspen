import React, { useEffect, useContext, useState, useCallback } from 'react';
import {
    Box,
    Button,
    Typography,
    Paper
} from '@mui/material';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { EventContext } from '../../App';
import ProgressBar from '../../components/ProgressBar';
import TeamInfoModal from '../../components/Team/TeamInfoModal';
import { DonateButton } from '../../components/DonateButton';
import SharingButtonCustomLink from '../../components/Share/SharingButtonCustomLink';
import axios from 'axios';
import Team from '../../JsModels/team';
import DynamicModal from '../../components/DynamicModal';



export function Home() {


    const navigate = useNavigate();
    const { currentEvent } = useContext(EventContext);
    const [donationsTotal, setdonationsTotal] = useState<number>(0.0);
    const [progressBarIsUptodate, setprogressBarIsUptodate] = useState<boolean>(false);
    const [loggedInUserId, setLoggedInUserId] = useState<number>();
    const [canSwitchTeam, setCanSwitchTeam] = useState<boolean>(true);
    const [onATeam, setOnATeam] = useState<boolean>(false);
    const [openConfrimModal, setOpenConfrimModal] = useState(false)
    const [openEventDetailsOkModal, setOpenEventDetailsOkModal] = useState(false)
    const [isOkModal, setIsOkModal] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        };

        const checkAllTeams = async () => {
            if(currentEvent?.id !== undefined){

                var teams = await axios.get(process.env.PUBLIC_URL + `/api/teams/event/${currentEvent?.id}`, config)
                teams.data.forEach((team: Team) => {
                    if (team.ownerID === loggedInUserId) {
                        setCanSwitchTeam(false)
                    }
                });
            }
        }
        
        const checkIfOnTeam = async () => {
            if(currentEvent?.id !== undefined && loggedInUserId !== undefined){
                var res = await axios.get(process.env.PUBLIC_URL + `/api/PersonTeamAssociation/${loggedInUserId}/${currentEvent?.id}`)
                if (res.status === 200) {
                    setCanSwitchTeam(true)
                    setOnATeam(true);
                }
            }
            
                
            
        }
        

        const getUser = async () => {
            await axios.get(process.env.PUBLIC_URL + '/api/user', config).then((response) => {
                setLoggedInUserId(response?.data?.id)
            }).catch((error) => {
                console.log("There was an error retrieving user", error)
            })

        }
        

        const callServise = async () => {
            await getUser();
            await checkIfOnTeam();
            await checkAllTeams();
        };
        
            callServise();


    }, [currentEvent, loggedInUserId,  currentEvent?.id]);

    const closeModal = () => {
        setIsOkModal(false)
        setOpenConfrimModal(false)
        setOpenEventDetailsOkModal(false)
        setMessage("")
    }

    const openModal = () => {
        setIsOkModal(false)
        setOpenEventDetailsOkModal(false)
        setOpenConfrimModal(true)
        setMessage("Are you sure you want to create a new team? This will remove you from the current team you are on.")
    }
    const messageArray: string[] = [
        `Event: ${currentEvent?.title}. `,
        ` Location: ${currentEvent?.location}. `,
        ` Description: ${currentEvent?.description}`,
    ]
    const displayMessage: string = messageArray.join('\n')
    

    const getDonationTotal = useCallback(async () => {
        try {
            if (currentEvent?.id === undefined) {
                return;
            }
            const response = await axios.get(`api/donations/event/${currentEvent?.id}`);
            const data = response.data;
            setdonationsTotal(data);
            setprogressBarIsUptodate(true);

        } catch (e) {

        }
    }, [currentEvent?.id]);

    useEffect(() => {
        getDonationTotal();
    }, [currentEvent?.donationTarget, donationsTotal, getDonationTotal]);

    return (
        <Box>
            <Paper square={true} className="PaperColor">
                <Box className="CurrentEventPosition">
                    <Typography data-testid={"homePageHeader"} id={"homePageHeader"} className="CurrentEventTextDetails">
                        {currentEvent?.title}
                    </Typography>
                    
                </Box>
                <Box>
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
                    
                    <SharingButtonCustomLink
                    defaultMessage='Come look at this awesome event happening.'
                    defaultSubject='Awesome Charity Event' />
                    <Box sx={{ ml: "10px"}}>
                        <Button variant='contained'
                            className = "EventDetailsButton"
                            onClick={() => {
                                setMessage(displayMessage);
                                setIsOkModal(true)
                                setOpenEventDetailsOkModal(true)
                            }}>
                            Event Details
                        </Button>
                        <DynamicModal
                            open={openEventDetailsOkModal}
                            close={closeModal}
                            message={message}
                            onConfirm={closeModal}
                            isOkConfirm={isOkModal}
                        />
                    </Box>

                    <DonateButton />
                </Box>

            </Paper>
            <Paper square={true} className="SecondaryPaperColor">
                <Box className="SubTextHeaderPosition">
                    <Typography className="SubTextHeaderDetails">
                        Charity Teams
                    </Typography>
                </Box>
                <Box className="SubTextBodyPosition">
                    <Typography className="SubTextBodyDetails" paragraph={true} >
                    Joining a charity team is a fulfilling way to make a positive impact while connecting with like-minded individuals who share your passion for giving back.
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
                            ACTIVE TEAMS
                        </Button>
                        {canSwitchTeam ? <Button variant='contained' className="CreateTeamButtonDetails" 
                        onClick={() => {onATeam ? openModal() : navigate('/createteam') }}
                            data-testid={'createATeamBtn'}
                            id={"createATeamBtn"}>
                            CREATE A TEAM
                        </Button> : null}
                    </Box>
                </Box>
            </Paper>
            <DynamicModal
                open={openConfrimModal}
                close={closeModal}
                message={message}
                onConfirm={() => navigate('/createteam')}
                isOkConfirm={isOkModal}
            />


        </Box>
    );
}
