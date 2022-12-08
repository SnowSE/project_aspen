import React from 'react';
import {
    Box,
    Typography,
} from '@mui/material';
import StripeContainer from '../../components/Stripe/StripeContainer';




export function DonationPage() {
    return (
        <Box >
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography data-testid={"donationPageHeader"} id={"donationPageHeader"}>
                    Each meal is $10. How many meals would you like to donate?
                </Typography>
            </Box>
            <br />
            
                <br/>
            
            <StripeContainer />
        </Box>
    );
}