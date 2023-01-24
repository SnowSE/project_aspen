import { useContext } from "react";
import {useNavigate, useParams } from "react-router-dom";
import Confetti from 'react-confetti'
import { Box, Button, Divider, Typography } from "@mui/material";
import { EventContext } from "../../App";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SharingButton from "../../components/Share/SharingButton";


const SuccessfulDonation = () => {
    const { personName, teamName } = useParams()
    const { currentEvent } = useContext(EventContext);
    const navigate = useNavigate();

    return (
        <Box>
            <Box>
                <CheckCircleOutlineIcon />
            </Box>
            {personName === "Anonymous" ?
                <Box>
                    <Confetti  />
                    <h1 style={{ textAlign: 'center' }}>Thank you stranger for your donation</h1>
                </Box>
                :
                <Box>
                    <Confetti />

                    <h1 style={{ textAlign: 'center' }}>
                        Thank you {personName} for your donation to the {teamName} team during {currentEvent?.title} event!
                    </h1>
                </Box>
            }
            <Divider />
            <Box>
                <Typography>
                    Summary:
                </Typography>
            </Box>
            <Box>
                <Typography>
                    Contribution to {currentEvent?.Title }: (Donation Value to be added)
                </Typography>
            </Box>
            <Divider />
            <Box>
                <Typography>
                    Date: get current date
                </Typography>
            </Box>
            <Box>
                <Typography>
                    Transaction ID: 
                </Typography>
            </Box>
            <Divider />
            <Box>
                <Typography>
                    name
                </Typography>
            </Box>
            <Box>
                <Typography>
                    email
                </Typography>
            </Box>
            <Box>
                <Typography>
                    phone number
                </Typography>
            </Box>

            <Box className="DonateButtonPosition">
                <Button onClick={() => navigate("/")} variant='contained'
                    data-testid={'homePageBtn'}
                    id={"homePageBtn"}>
                    Return to home page
                </Button>
                <SharingButton />
            </Box>

        </Box>
    );
}

export default SuccessfulDonation;