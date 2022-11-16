import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { authService } from "../services/authService";


const LoginButton = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const loginHandler = () => {
        authService.signinRedirect();
    }
    const logoutHandler = () => {
        authService.logout()
    }

    useEffect(() => {
        async function currentUser() {
            var user = await authService.getUser()
            console.log("user roles:", user?.profile.roles)
            user?.profile.roles.forEach((role: string) => {
                console.log(role)
                if (role.includes("admin")) {
                    console.log("here")
                    setIsAdmin(true)

                }
                else {
                    setIsAdmin(false)
                }
            });
        }
        currentUser()
    }, [])


    return (
        <Box sx={{color: "white"} }>
            {localStorage.getItem("LoggedInUser") == "" ? <Button onClick={loginHandler} variant='contained' sx={{ backgroundColor: 'orange', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Login</Button> : <> <Button onClick={logoutHandler} variant='contained' sx={{ backgroundColor: 'orange' }}>Logout</Button><h5>   Logged In As: {localStorage.getItem("LoggedInUser")}</h5> </>}
        </Box>
    );
}

export default LoginButton;