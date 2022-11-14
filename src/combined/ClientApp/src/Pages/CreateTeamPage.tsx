import { Box, Button } from "@mui/material";
import CreateTeamForm from "../components/CreateTeamForm";

const ASPEN_API = (process.env.REACT_APP_BASE_URL || "https://engineering.snow.edu") + process.env.PUBLIC_URL + "/api"
console.log("ASPEN_API value is", ASPEN_API)

const CreateTeamPage = () => {




    return (
        <Box data-testid="createATeamPage">
            <h1>Create team here</h1>
            <CreateTeamForm />
        </Box>
    );
}

export default CreateTeamPage;