import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface registration {
    creationDate: Date,
    isPublic: boolean,
    nickname: string,
    ownerID: number,
    teamID: number,
    personRegistrations: [
        {
            personID: number,
            person: {
                authID: string,
                name: string,
                bio: string
            },
            createdDate: Date
        }
    ]
}

export function AddMemberToTeam() {
    const navigate = useNavigate();
    const api = process.env.PUBLIC_URL + `/api/Registration`;
    console.log(api)

    return (
        <div>
            <h2>You are not logged in yet! So please sign in first 😒</h2>

            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', float: "right" }}>
                <Button onClick={() => navigate('/LoginButton')}
                    sx={{ backgroundColor: 'orange', m: 2, fontSize: '10px' }}  >Go to Sign In Page</Button>
            </Grid>


        </div>);


}
