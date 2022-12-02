import { Box, Button, Typography } from "@mui/material";
import { authService } from "../services/authService";


const LoginButton = () => {
    const loginHandler = () => {
        authService.signinRedirect();
    }
    const logoutHandler = () => {
        authService.logout()
    }

    


    return (
        <Box sx={{color: "white"} }>
                {localStorage.getItem("LoggedInUser") === "" ?
                <Button
                    onClick={loginHandler}
                    variant='contained'
                    sx={{ backgroundColor: 'orange', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    Login
                </Button> : <>
                    <Button
                        onClick={logoutHandler}
                        variant='contained'
                        sx={{ backgroundColor: 'orange' }}
                    >
                        Logout
                    </Button>
                    <Typography
                        variant="h6"
                        
                    >   Logged In As: {localStorage.getItem("LoggedInUser")}
                    </Typography> </>
            }
        </Box>
    );
}

export default LoginButton;