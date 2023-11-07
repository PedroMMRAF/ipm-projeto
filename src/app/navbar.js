import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import NavbarToggle from 'react-bootstrap/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavDropdownItem from 'react-bootstrap/DropdownItem';
import NavDropdownDivider from 'react-bootstrap/DropdownDivider';
import NavDropdownHeader from 'react-bootstrap/DropdownHeader';

import './navbar.scss';


function Dropdown({ title }) {
    return (
        <NavDropdown title={title} href="#home">
            <div className="dropdown-multicol">
                <div className="dropdown-col">
                    <NavDropdownHeader>Genres</NavDropdownHeader>
                    <NavDropdownDivider />
                    <NavDropdownItem href="#">Action</NavDropdownItem>
                    <NavDropdownItem href="#">Adventure</NavDropdownItem>
                    <NavDropdownItem href="#">Comedy</NavDropdownItem>
                    <NavDropdownItem href="#">Drama</NavDropdownItem>
                    <NavDropdownItem href="#">Sci-Fi</NavDropdownItem>
                    <NavDropdownItem href="#">Show more...</NavDropdownItem>
                </div>
                <div className="dropdown-col">
                    <NavDropdownHeader>Trending Topics</NavDropdownHeader>
                    <NavDropdownDivider />
                    <NavDropdownItem href="#">New {title}</NavDropdownItem>
                    <NavDropdownItem href="#">Top {title}</NavDropdownItem>
                    <NavDropdownItem href="#">Throwback {title}</NavDropdownItem>
                    <NavDropdownItem href="#">Trending {title}</NavDropdownItem>
                    <NavDropdownItem href="#">Popular {title}</NavDropdownItem>
                    <NavDropdownItem href="#">Random {title}</NavDropdownItem>
                </div>
            </div>
        </NavDropdown>
    )
}


export default function MyNavbar() {
    return (
        <Navbar bg="light" expand="lg" className="fixed-top">
            <Container>
                <NavbarBrand href="#home">MTVDB</NavbarBrand>
                <NavbarToggle aria-controls="basic-navbar-nav" />
                <NavbarCollapse id="basic-navbar-nav" className="container justify-content-between">
                    <Nav>
                        <Dropdown title="Movies" />
                        <Dropdown title="TV Shows" />
                        <NavLink href="#near-you">Near You</NavLink>
                    </Nav>
                    <Nav>
                        <NavLink href="#">Login</NavLink>
                        <NavLink href="#">Lupa</NavLink>
                        <NavLink href="#">Hamburguer</NavLink>
                    </Nav>
                </NavbarCollapse>
            </Container>
        </Navbar>
    );
}