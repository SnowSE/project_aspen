import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import CreateTeamForm from "../../components/Team/CreateTeamForm";
import { authService } from "../../services/authService";

const ASPEN_API = process.env.PUBLIC_URL + "/api"
console.log("ASPEN_API value is", ASPEN_API)

const CreateTeamPage = () => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    
    useEffect(() => {
        
        async function currentUser() {
            var user = await authService.getUser()
            if (user == null) {
                setIsLoggedIn(false)
            }
            else {
                setIsLoggedIn(true)
            }
        }
        currentUser()
    }, [])

    return (
        <Box data-testid="createATeamPage" >
            {isLoggedIn ? <CreateTeamForm /> : <h1 style={{ textAlign: 'center' }}>Must Be Logged in to Create Team</h1>}
        </Box>
    );
}

export default CreateTeamPage;