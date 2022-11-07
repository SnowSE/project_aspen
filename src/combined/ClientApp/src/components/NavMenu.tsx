import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom'
import styled from '@emotion/styled';
import ReactDOM from 'react-dom';
import { deepPurple, purple } from '@mui/material/colors';


const NavMenu = () => {

    const pages = [
        { text: 'Home', href: '/' },
        { text: 'Swagger', href: `/swagger` },
        { text: 'Counter', href: '/counter' },
        { text: 'Fetch Data', href: '/fetch-data' },
    ]

    const purpleTheme = createTheme({
        palette: {
            primary: {
                main: deepPurple[500],
            },
            secondary: {
                main: '#f44336',
            },
        },
    });
    const LinkStyle = styled(Link)`
    color: White;
    text-decoration: none;
    margin: 1rem;
    position: relative;
    `;


    return (
        <ThemeProvider theme={purpleTheme}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
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
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};
export default NavMenu;
