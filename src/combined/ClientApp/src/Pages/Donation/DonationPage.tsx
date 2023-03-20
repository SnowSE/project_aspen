import React from 'react';
import {
    Box,
    Typography,
} from '@mui/material';
import StripeContainer from '../../components/Stripe/StripeContainer';
import SharingButtonCustomLink from '../../components/Share/SharingButtonCustomLink';
import { useLocation } from 'react-router-dom';

interface Props {
    state?: {
        GUID: string;
    };
}

export default function DonationPage(props: Props) {
    const { state } = useLocation();
    const personGUID = state?.GUID.personGUID || '';
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

            <StripeContainer personGUID={personGUID} />
            <SharingButtonCustomLink />
        </Box>
    );
}