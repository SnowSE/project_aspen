import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, makeStyles, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import  MenuIcon  from "@mui/icons-material/Menu";



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
                            <ListItemButton>
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
                </Box>
            </Drawer>
            <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon sx={{color:"white"} } />
            </IconButton>
            <Box>
                SanPete Food Pantry
            </Box>
        </Box>
    );
}
export default DrawerComponent;
