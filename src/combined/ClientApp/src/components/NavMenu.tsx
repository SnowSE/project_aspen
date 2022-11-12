import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme, Toolbar, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom'
import styled from '@emotion/styled';
import ReactDOM from 'react-dom';
import { deepPurple, purple } from '@mui/material/colors';
import { authService } from '../services/authService';


const NavMenu = () => {

    const pages = [
        { text: 'Home', href: '/' },
        { text: 'Swagger', href: `/swagger` },
        { text: 'Counter', href: '/counter' },
        { text: 'Fetch Data', href: '/fetch-data' }
    ]

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
                        <Box sx={{ flexGrow: .5, display: { md: 'flex' }}}>
                            {pages.map((page) => (
                                <LinkStyle
                                to={page.href}
                                key={page.text}
                                >
                                    {page.text}
                                </LinkStyle>
                            ))}
                        </Box>
                        {localStorage.getItem("LoggedInUser") == "" ? <Button onClick={loginHandler} variant = 'contained' sx = {{backgroundColor:'orange'}}>Login</Button>: <> <Button onClick={logoutHandler} variant = 'contained' sx = {{backgroundColor:'orange'}}>Logout</Button><h5>   Logged In As: {localStorage.getItem("LoggedInUser")}</h5> </>}
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};
export default NavMenu;
