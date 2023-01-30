import React from "react";
import { Typography, Box, Divider } from '@mui/material';
import { BackToDonationButton } from "../../components/BackToDonationButton";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const FailedPaymentPage = () => {
    return (
        <Box>
            <Box sx={{ justifyContent: 'center' }}>
                <CancelOutlinedIcon />
            </Box>
            <Box sx={{ justifyContent: 'center' }}>
                <Typography>
                    ERROR
                </Typography>
            </Box>
            <Divider />
            <Box>
                <Typography sx={{ justifyContent: 'center' }}>
                    Error Message
                </Typography>
            </Box>
            <Divider />
            <Box sx={{ justifyContent: 'center' }}>
                <BackToDonationButton />
            </Box>
        </Box>
        );
};

export default FailedPaymentPage;