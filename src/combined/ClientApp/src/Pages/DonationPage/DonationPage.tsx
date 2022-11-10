import React, { Component } from 'react';
import {
    Box,
    Typography,
} from '@mui/material';


export function DonationPage() {
    return (
        <Box>
            <Typography data-testid={"donationPageHeader"} id={"donationPageHeader"}>
                Thank you for coming to the donation page. PLEASE GIVE ME YOUR MONEY
            </Typography>
        </Box>
    );
}