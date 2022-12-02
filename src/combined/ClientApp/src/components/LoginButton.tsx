import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
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
        <Box >
            <Box className = "BoxPadding">
            {localStorage.getItem("LoggedInUser") == "" ?
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