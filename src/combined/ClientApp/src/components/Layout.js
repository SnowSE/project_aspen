import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu, NavMenu2 } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavMenu />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}


export function Layout2() {
    return (
        <div>
            <NavMenu />
            <Container>
                {this.props.children}
            </Container>
        </div>
    );
}