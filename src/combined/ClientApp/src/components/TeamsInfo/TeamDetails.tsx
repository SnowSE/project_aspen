import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TeamCard } from "./Interfaces";


type TeamCardProps = {
    team: typeof TeamCard
}


export function TeamDetails() {


    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const api = process.env.PUBLIC_URL + `/api/teams/${id}`;
    const [currentTeam, setCurrentTeam] = useState<any>();


    const fetchTeam = async () => {
        const res = await fetch(api)
        console.log("I am inside the fetchTEam", res);
        const response = await res.json()
        console.log("I am inside the fetchTEam1", response);
        setCurrentTeam(response)
    }
    useEffect(() => {
        const callServise = async () => {
            await fetchTeam()        }

        callServise()
    }, []);
    console.log("currentTeam Z", currentTeam);
    const navigate = useNavigate();

    const loggedInUSer = localStorage.getItem("LoggedInUser")

    return (
        <div>   
           
            <h1>I am in Team details page</h1>
            <h1>I am in Team details page   {id}</h1>
            {currentTeam?.name}
            {currentTeam?.id}
            {currentTeam?.description}
            {currentTeam?.mainImage}
            {currentTeam?.ownerID}
            {currentTeam?.owner}
            {currentTeam?.eventID}
            {currentTeam?.donationTarget}

            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', float: "right" }}>
                <Button onClick={() => loggedInUSer ? navigate('/LoggedInUser') : navigate('/NotLoggedInUser')}
                    sx={{ backgroundColor: 'orange', m: 2, fontSize: '10px' }}  >Join Our Team</Button>
            </Grid>



        </div>
    );
}
    