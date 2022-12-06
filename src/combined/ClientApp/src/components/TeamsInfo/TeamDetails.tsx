import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import Registration from "../../JsModels/registration";
import { authService } from "../../services/authService";




export function TeamDetails() {

    const baseImageUrl = process.env.PUBLIC_URL + "/assets/"

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const api = process.env.PUBLIC_URL + `/api/teams/${id}`;
    const [currentTeam, setCurrentTeam] = useState<any>();
    const [currentTeamRegisrtations, setCurrentTeamRegistrations] = useState <Registration[]>([]);

    useEffect(() => {      
    const fetchTeam = async () => {
        const res = await fetch(api)
        const response = await res.json()
        setCurrentTeam(response)
        setCurrentTeamRegistrations(response.registrations)
    }
    const callServise = async () => {
        await fetchTeam()
    }

        callServise()
    }, [api]);
        

    const navigate = useNavigate();
    const loggedInUSer = localStorage.getItem("LoggedInUser")
    return (
        <div>   
           
            {currentTeam?.name}
            {currentTeam?.id}
            {currentTeam?.description}
            <img alt = "mainImage"src={baseImageUrl + currentTeam?.mainImage}/>
            {currentTeam?.ownerID}
            {currentTeam?.owner}
            {currentTeam?.eventID}
            {currentTeam?.donationTarget}  
            <h3>There are {currentTeamRegisrtations.length} members in a this team!</h3>
            <ul>
                {currentTeamRegisrtations.map((registration) => registration.isPublic===true &&
                    <li key={registration.id}> {registration.nickname}</li>
                )}
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
    