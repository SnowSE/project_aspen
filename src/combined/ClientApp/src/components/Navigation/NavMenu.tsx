import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import {Toolbar,  useMediaQuery, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom'
import { authService } from '../../services/authService'; 
import DrawerComponent from './DrawerComponent';
import { useEffect, useState } from 'react';
import LoginButton from '../LoginButton';


const NavMenu = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const pages = [
        { text: 'Home', href: '/' },
        { text: 'Add Event', href: '/createEvent' },


    ]

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        pages.push({ text: 'Swagger', href: `/swagger` });
    }
    
    const adminPages = (value: any) => {
        if (isAdmin === false && value.key === "Add Event") {
            return false
        }
        else {
            return true
        }
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

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    return (

        <>
            <AppBar className="NavMenuColorAndPosition">
            <Container >
                <Toolbar disableGutters>
                    <Typography
                        component="a"
                        href="https://sanpetepantry.org/"
                        className="HeaderInNavMenu"
                    >
                        SanPete Food Bank
                    </Typography>
                    {isMobile ? (
                        <DrawerComponent />
                    ) : (

                        <Box className="NavMenuSpacing">
                            {pages.map((page) => (
                                <Link
                                    className="NavMenuLinks"
                                    to={page.href}
                                    key={page.text}
                                >
                                    {page.text}
                                </Link>
                            )).filter(adminPages)}
                        </Box>
                    )}
                        <Box className= "LoginFeaturesInNavMenu">
                        <LoginButton />
                        <Box>
                            <Typography className="UserNameSpacing">
                                {localStorage.getItem("LoggedInUser")}
                            </Typography>
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
            </AppBar>
            <Box className="NavMenuPadding" />
        </>

    );
};
export default NavMenu;
