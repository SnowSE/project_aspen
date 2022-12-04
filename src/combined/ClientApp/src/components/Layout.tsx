import React, {FC, ReactNode } from 'react';
import { Container } from 'reactstrap';
import  NavMenu from './Navigation/NavMenu';

export const Layout: FC<{children: ReactNode}> = (props) => {
    return (
        <div>
            <NavMenu />
            <Container>
                {props.children}
            </Container>
        </div>
    );
}