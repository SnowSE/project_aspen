import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, makeStyles, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import  MenuIcon  from "@mui/icons-material/Menu";
import LoginButton from "./LoginButton";



const pages = [
    { text: 'Home', href: '/' }
]

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    pages.push({ text: 'Swagger', href: `/swagger` });
    pages.push({ text: 'Counter', href: '/counter' });
    pages.push({ text: 'Fetch Data', href: '/fetch-data' });
}

const LinkStyle = styled(Link)`
    color: White;
    text-decoration: none;
    margin: 1rem;
    position: relative;
    hover: Orange;
    `;

function DrawerComponent() {
    const [openDrawer, setOpenDrawer] = useState(false);
    return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Drawer
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}
                
                >
                    <Box sx={{ backgroundColor: '#673ab7', flexGrow: 1, display: { md: 'flex' } }}>
                        {pages.map((page) => (
                            <List >
                            <ListItem>
                                    <ListItemButton onClick={() => setOpenDrawer(false) }>
                                    <LinkStyle
                                        to={page.href}
                                        key={page.text}
                                    >
                                        {page.text}
                                    </LinkStyle>
                                    </ListItemButton>
                                </ListItem>

                        </List>
                        ))}
                    <Box sx={{ position: 'absolute', alignItems: 'center', bottom: 5} }>
                        <LoginButton />
                    </Box>
                    </Box>
                </Drawer>
                <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
                    <MenuIcon sx={{color:"white"} } />
                </IconButton>
                <Box>
                    <Typography
                        component="a"
                        href="https://sanpetepantry.org/"
                        variant="h6"
                        align='center'
                        noWrap
                        sx={{
                            mr: 2,
                            display: {md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'white',
                            textDecoration: 'none',
                            "&:Hover": { color: "orange" }
                        }}>
                        SanPete Food Bank
                    </Typography>
                </Box>
            </Box>
    );
}
export default DrawerComponent;
