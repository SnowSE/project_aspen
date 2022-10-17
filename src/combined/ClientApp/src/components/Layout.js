import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu, NavMenu2 } from './NavMenu';

export function Layout(props) {
    return (
        <div>
            <NavMenu />
            <Container>
                {props.children}
            </Container>
        </div>
    );
}