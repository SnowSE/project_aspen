import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Confetti from 'react-confetti'
import { Box, Button, Grid, Typography } from "@mui/material";
import { EventContext } from "../../App";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SharingButton from "../../components/Share/SharingButton";




const SuccessfulDonation = () => {

    const { personName, teamName, transactionId, amount, email, dateTime } = useParams()
    const { currentEvent } = useContext(EventContext);
    const navigate = useNavigate();





    return (

        <Box className="SuccessfulDonationBorder">
            <Box sx={{ justifyContent: 'center' }}>
                <CheckCircleOutlineIcon />
            </Box>
            {teamName === "Default" ?
                <Box>
                    <Confetti />
                    <h1 style={{ textAlign: 'center' }}>Thank you {personName} for your donation</h1>
                    <h6 style={{ textAlign: 'center', }}>Receipt # {transactionId}</h6>

                    <br />
                </Box>
                :
                <Box>
                    <Confetti />

                    <h1 style={{ textAlign: 'center' }}>
                        Thank you {personName} for your donation to the {teamName} team during {currentEvent?.title} event!
                    </h1>
                    <h6 style={{ textAlign: 'center', }}>Transaction Id: {transactionId}</h6>
                    <br />
                </Box>
            }

            <Grid container spacing={1}>
                <Grid item xs={4} md = {4}>
                    <Typography textAlign={"center"} fontWeight={"bold"}>
                        Amount Paid
                    </Typography>
                </Grid>
                <Grid item xs={4} md = {4}>
                    <Typography textAlign={"center"} fontWeight={"bold"}>
                        Date Paid
                    </Typography>
                </Grid>
                <Grid item xs={4} md = {4}>
                    <Typography textAlign={"center"} fontWeight={"bold"}>
                        Email
                    </Typography>
                </Grid>

                <Grid item xs={4} md = {4}>
                    <Box>
                        <Typography textAlign={"center"}  fontSize={"25px"}>
                            {'$ ' + amount + '.00'}
                        </Typography>
                    </Box>

                </Grid>
                <Grid item xs={4} md = {4}>
                    <Box>
                        <Typography textAlign={"center"} fontSize={"25px"}>
                            {dateTime}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={4} md = {4}>
                    <Box>
                        <Typography textAlign={"center"}  fontSize={"25px"}>
                            {email}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

            <br/>
            <br/>
            <br/>
            
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