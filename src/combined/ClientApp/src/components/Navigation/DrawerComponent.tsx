import { Box, Drawer, IconButton, List, ListItem, ListItemButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import  MenuIcon  from "@mui/icons-material/Menu";
import LoginButton from "../LoginButton";
import "../../ComponentStyling.css"


const pages = [
    { text: 'Home', href: '/' },
    { text: 'Team Details', href: '/TeamDetails' },
    { text: 'Admin Dashboard', href: '/AdminDashboard' },
    { text: 'Donate', href: '/Donate' },
]

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    pages.push({ text: 'Swagger', href: `/swagger` });
}

function DrawerComponent() {
    const [openDrawer, setOpenDrawer] = useState(false);
    return (
            <Box className = 'DrawerAlignment'>
                <Drawer
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}
                
                >
                    <Box className = "DrawerColor" >
                        {pages.map((page) => (
                            <List >
                                <ListItem >
                                    <ListItemButton  onClick={() => setOpenDrawer(false) }>
                                        <Link
                                            className="DrawerLinks"
                                            to={page.href}
                                            key={page.text}
                                        >
                                            {page.text}
                                        </Link>
                                    </ListItemButton>
                                </ListItem>

                            </List>
                        ))}
                    <Box>
                        <Typography className="LoginNameInDrawer">
                            {localStorage.getItem("LoggedInUser")}
                        </Typography>
                        <LoginButton />
                    </Box>
                    </Box>
                </Drawer>
                <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon className="HamburgerMenuColor" />
                </IconButton>
                <Box>
                    <Typography
                        component="a"
                        href="https://sanpetepantry.org/"
                        className = "HeaderInDrawer"
                    >
                        SanPete Food Bank
                    </Typography>
                </Box>
            </Box>
    );
}
export default DrawerComponent;
