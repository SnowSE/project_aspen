import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import Registration from "../../JsModels/registration";
import { authService } from "../../services/authService";




export function TeamDetails() {

    const baseImageUrl = process.env.REACT_APP_BASE_URL + "/assets/"

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const api = process.env.PUBLIC_URL + `/api/teams/${id}`;
    const [currentTeam, setCurrentTeam] = useState<any>();
    const [currentTeamRegisrtations, setCurrentTeamRegistrations] = useState <Registration[]>([]);

    useEffect(() => {      
    const fetchTeam = async () => {
        const res = await fetch(api)
        console.log("I am inside the fetchTEam", res);
        const response = await res.json()
        console.log("I am inside the fetchTEam1", response);
        setCurrentTeam(response)
        console.log("I have got registrations", response.registrations)
        setCurrentTeamRegistrations(response.registrations)
    }
    const callServise = async () => {
        await fetchTeam()
    }

        callServise()
    }, [api]);

    console.log("currentTeam Z", currentTeam);
    console.log("I have got registrations 2", typeof(currentTeamRegisrtations))

    const navigate = useNavigate();

    const loggedInUSer = localStorage.getItem("LoggedInUser")

    return (
        <div>   
           
            <h1>I am in Team details page</h1>
            <h1>I am in Team details page   {id}</h1>
            {currentTeam?.name}
            {currentTeam?.id}
            {currentTeam?.description}
            <img alt = "mainImage"src={baseImageUrl + currentTeam?.mainImage}/>
            {currentTeam?.ownerID}
            {currentTeam?.owner}
            {currentTeam?.eventID}
            {currentTeam?.donationTarget}  
            <ul>
                {currentTeamRegisrtations.map(r => <li>{r.nickname}</li>)}
            </ul>



            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', float: "right" }}>
                <Button onClick={() => loggedInUSer ? navigate({
                    pathname: "/LoggedInUser",
                    search: `?${createSearchParams({
                        id: `${id}`,
                        ownerID: `${currentTeam?.ownerID}`

                    })}`
                }) : authService.signinRedirect()}
                    sx={{ backgroundColor: 'orange', m: 2, fontSize: '10px' }}  >Join Our Team</Button>
            </Grid>



        </div>
    );
}
    