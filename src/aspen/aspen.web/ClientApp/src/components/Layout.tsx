import * as React from 'react';
import { Container } from 'reactstrap';
import NavBar from "./NavBar";

export default (props: { children?: React.ReactNode }) => (
    <React.Fragment>
        <NavBar/>
        {props.children}
    </React.Fragment>
);
