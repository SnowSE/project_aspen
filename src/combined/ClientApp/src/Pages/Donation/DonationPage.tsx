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
                <Typography
                    data-testid={"donationPageHeader"}
                    id={"donationPageHeader"}
                    className="DonationPageHeader"
                >
                    Donation Page (1 of 2)
                </Typography>
            </Box>
            <br />
            
                <br/>
            
            <StripeContainer />
        </Box>
    );
}