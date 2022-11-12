import { Box, Button } from "@mui/material";
import CreateTeamForm from "../components/CreateTeamForm";

const CreateTeamPage = () => {




    return (
        <Box data-testid="createATeamPage">
            <h1>Create team here</h1>
            <CreateTeamForm />
        </Box>
    );
}

export default CreateTeamPage;