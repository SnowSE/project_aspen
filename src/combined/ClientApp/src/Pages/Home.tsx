import React, { Component } from 'react';
import {Box, 
        Button, 
        Typography, 
        Paper,
        IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';

export function Home() {
    return (
        <Box>
            <Paper square={true} sx={{backgroundColor:'#673ab7'}}>
                <Box sx={{display:'flex', justifyContent:'center'}}>
                    <Typography variant='h5' sx={{fontWeight:'bold', color:'white'}}>Food Drive</Typography>
                    <Box sx={{display:'flex', justifyContent:'end'}}>
                        <Button variant='contained' sx={{backgroundColor:'orange'}}>SIGN IN</Button>
                        <IconButton aria-label="delete" sx={{backgroundColor:'#673ab7', color:'white'}}  size='large'>
                            <ShareIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Paper>
            <Box sx={{display:'flex', justifyContent:'center'}}>
                <Typography variant='h6' sx={{fontSize: 20}}>
                    2 Is Better Than 1
                </Typography>
            </Box>
            <Box sx={{display:'flex', justifyContent:'center'}}>
                <Typography sx={{fontSize: 15}} paragraph={true}>
                    Studies show that when you work as a team, you are more productive, so why not join a team? The team who dontates the most meals can win some aswesome prizes!
                </Typography>
            </Box>

        </Box>
    );
}
