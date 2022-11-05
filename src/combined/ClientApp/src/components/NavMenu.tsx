import React, { Component, useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

const root = process.env.PUBLIC_URL
if(!root){ 
    throw "PUBLIC_URL is undefined";
}

export function NavMenu() {
    const [collapsed, setCollapsed] = useState(true)
    const toggleNavbar = () => {
        setCollapsed(!collapsed)
    }

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                <NavbarBrand tag={Link} to="/">combined</NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                    <ul className="navbar-nav flex-grow">
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to={`${root}/`}>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <a className="text-dark nav-link" href={`${root}/swagger`}>Swagger</a>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to={`${root}/counter`}>Counter</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to={`${root}/fetch-data`}>Fetch data</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to={`${root}/loginPage`}>LoginPage</NavLink>
                        </NavItem>
                    </ul>
                </Collapse>
            </Navbar>
        </header>
    );
}