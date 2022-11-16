import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme, Toolbar, Button, useMediaQuery, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom'
import styled from '@emotion/styled';
import ReactDOM from 'react-dom';
import { deepPurple, purple } from '@mui/material/colors';
import { authService } from '../../services/authService'; 
import DrawerComponent from './DrawerComponent';
import { useEffect, useState } from 'react';


const NavMenu = () => {
    const [isAdmin, setIsAdmin] = useState(false)

    const pages = [
        { text: 'Home', href: '/' },
        { text: 'Add Event', href: '/createEvent'}

    ]

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        pages.push({ text: 'Swagger', href: `/swagger` });
        pages.push({ text: 'Counter', href: '/counter' });
        pages.push({ text: 'Fetch Data', href: '/fetch-data' });
    }


    const purpleTheme = createTheme({
        palette: {
            primary: {
                main: deepPurple[500],
            },
            secondary: {
                main: '#ff9800',
            },
        },
    });


    const LinkStyle = styled(Link)`
    color: White;
    text-decoration: none;
    margin: 1rem;
    position: relative;
    hover: Orange;
    `;

    const loginHandler = () => {
        authService.signinRedirect();
    }
    const logoutHandler = () => {
        authService.logout()
    }

    const adminPages = (value:any) => {
        if(isAdmin == false && value.key == "Add Event"){
            console.log("value is: ", value)
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
            user?.profile.roles.forEach((role:string)=> {
                console.log(role)
                if(role.includes("admin")){
                    console.log("here")
                    setIsAdmin(true)

                }
                else{
                    setIsAdmin(false)
                }
            });
        }
        currentUser()
    },[])
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    return (
        <ThemeProvider theme={purpleTheme}>
            <AppBar position="fixed">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            component="a"
                            href="https://sanpetepantry.org/"
                            variant="h6"
                            align = 'center'
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                color: 'white',
                                textDecoration: 'none',
                                "&:Hover": {color: "orange" }
                            }}
                        >
                            SanPete Food Bank
                        </Typography>
                        {isMobile ? (
                            <DrawerComponent /> 
                            ): (

                        <Box sx={{ flexGrow: .5, display: { md: 'flex' }}}>
                            {pages.map((page) => (
                                <LinkStyle
                                to={page.href}
                                key={page.text}
                                >
                                    {page.text}
                                </LinkStyle>
                            )).filter(adminPages)}
                        </Box>
                        )}
                        {localStorage.getItem("LoggedInUser") == "" ? <Button onClick={loginHandler} variant='contained' sx={{ backgroundColor: 'orange', display: 'flex', justifyContent: 'right', alignItems: 'right' }}>Login</Button> : <> <Button onClick={logoutHandler} variant='contained' sx={{ backgroundColor: 'orange' }}>Logout</Button><h5>   Logged In As: {localStorage.getItem("LoggedInUser")}</h5> </>}
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};
export default NavMenu;
