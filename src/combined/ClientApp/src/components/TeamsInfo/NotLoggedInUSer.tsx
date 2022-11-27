import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export function NotLoggedInUser() {
    const navigate = useNavigate();


    return (
        <div>
            <h2>You are not logged in yet! So please sign in first 😒</h2>
             
            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', float: "right" }}>
                <Button onClick={() => navigate('/LoginButton') }
                    sx={{ backgroundColor: 'orange', m: 2, fontSize: '10px' }}  >Go to Sign In Page</Button>
            </Grid>


        </div>);

    
}
