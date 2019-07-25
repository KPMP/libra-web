import React, { Component } from 'react';
import { Navbar, NavbarBrand, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <Navbar id="navbar" className="px-1 py-1 fixed-top">
        <Col xs={6}>
          <Link to="/" className="navbar-header">
            <NavbarBrand tag="span" className="d-flex align-items-center">
              <img src="img/logo.png" alt="Data Manager" className="logo" />
              <span id="title-text" className="ml-2 text-dark">Data Manager</span>
            </NavbarBrand>
          </Link>
        </Col>
      </Navbar>
    );
  }
}

export default NavBar;
