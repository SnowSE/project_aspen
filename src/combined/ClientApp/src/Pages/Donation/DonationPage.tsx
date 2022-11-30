import React, { Component } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
} from '@mui/material';


export function DonationPage() {
    return (
        <Box >
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography data-testid={"donationPageHeader"} id={"donationPageHeader"}>
                    Each meal is $10. How many meals would you like to donate?
                </Typography>
            </Box>
            <br />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <TextField
                    id="filled-number"
                    label="Meals"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        inputProps: { min: 0}
                    } }
                    variant="filled"
                 />
            </Box>
                <br/>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant='contained'
                    sx={{ backgroundColor: 'orange' }}>
                    Donate Now
                </Button>
            </Box>
        </Box>
    );
}