import { Box, Button, Typography } from "@mui/material";
import { authService } from "../services/authService";
import "../ComponentStyling.css"


const LoginButton = () => {
    const loginHandler = () => {
        authService.signinRedirect();
    }
    const logoutHandler = () => {
        authService.logout()
    }

    


    return (
<<<<<<< HEAD
        <Box >
            <Box className = "BoxPadding">
            {localStorage.getItem("LoggedInUser") == "" ?
=======
        <Box sx={{color: "white"} }>
                {localStorage.getItem("LoggedInUser") === "" ?
>>>>>>> master
                <Button
                    onClick={loginHandler}
                    variant='contained'
                    className= "LoginButton"
                >
                    Login
                </Button> : <>
                    <Button
                        onClick={logoutHandler}
                        variant='contained'
                        className="LogoutButton"
                    >
                        Logout
                    </Button> </>
                }
                </Box>
        </Box>
    );
}

export default LoginButton;