import { useContext, useEffect } from "react";
import {useNavigate, useParams } from "react-router-dom";
import Confetti from 'react-confetti'
import { Box, Button, Divider, Typography } from "@mui/material";
import { EventContext } from "../../App";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SharingButton from "../../components/Share/SharingButton";




const SuccessfulDonation = () => {

    const { personName, teamName, transactionId, amount, email, phoneNumber } = useParams()
    const { currentEvent } = useContext(EventContext);
    const navigate = useNavigate();

    



    return (

        <Box>
            <Box sx={{ justifyContent: 'center' }}>
                <CheckCircleOutlineIcon  />
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
                <Typography sx={{fontWeight: 'bold'} }>
                    Summary:
                </Typography>
            </Box>
            <Box>
                <Typography>
                    Contribution to: {currentEvent?.title}
                </Typography>
            </Box>
            <Box>
                <Typography>
                    Amount: {amount}
                </Typography>
            </Box>
            <Divider />
            <Box>
                <Typography>
                    Transaction ID: {transactionId}
                </Typography>
            </Box>
            <Divider />
            <Box>
                <Typography>
                    Name: {personName}
                </Typography>
            </Box>
            <Box>
                <Typography>
                    Email: {email}
                </Typography>
            </Box>
            <Box>
                <Typography>
                    Phone Number: {phoneNumber? phoneNumber: "None Provided"}
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