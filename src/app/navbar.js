'use client'

import React, { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
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

import "./navbar.scss";


const MOVIE_GENRES = [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "History",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Sport",
    "Thriller",
    "War",
    "Western",
];

const TV_GENRES = [
    "Action",
    "Adventure",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Historical",
    "Horror",
    "Medical",
    "Mystery",
    "Reality",
    "Romance",
    "Sci-Fi",
    "Sitcom",
    "Soap Opera",
    "Sports",
    "Talk Show",
    "Thriller",
    "War",
    "Western",
];


function Dropdown({ title, genres }) {
    let visible = genres.slice(0, 5);
    let hidden = genres.slice(5);

    let [isOpen, setIsOpen] = useState(false);

    const toggleCollapse = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    }

    return (
        <NavDropdown title={title} href="#home">
            <div className="dropdown-multicol">
                <div className="dropdown-col">
                    <NavDropdownHeader>Genres</NavDropdownHeader>
                    <NavDropdownDivider />
                    {visible.map((genre, i) => (
                        <NavDropdownItem key={i} href="#">{genre}</NavDropdownItem>
                    ))}
                    <Collapse in={isOpen}>
                        <div>
                            {hidden.map((genre, i) => (
                                <NavDropdownItem key={i} href="#">{genre}</NavDropdownItem>
                            ))}
                        </div>
                    </Collapse>
                    <NavDropdownItem onClick={toggleCollapse}>
                        Show {isOpen ? "Less" : "More"}...
                    </NavDropdownItem>
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
    let [isOpen, setIsOpen] = useState(false);

    const toggleCollapse = (e) => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="fixed-top">
            <Navbar bg="light" expand="lg">
                <Container>
                    <NavbarBrand href="#home">MTVDB</NavbarBrand>
                    <NavbarToggle aria-controls="basic-navbar-nav" />
                    <NavbarCollapse id="basic-navbar-nav" className="container justify-content-between">
                        <Nav>
                            <Dropdown title="Movies" genres={MOVIE_GENRES} />
                            <Dropdown title="TV Shows" genres={TV_GENRES} />
                            <NavLink href="#near-you">Near You</NavLink>
                        </Nav>
                        <Nav>
                            <NavLink href="#"><i className="bi bi-person-circle"></i> Login</NavLink>
                            <NavLink href="#" onClick={toggleCollapse}><i className="bi bi-search"></i> Search</NavLink>
                            <NavLink href="#"><i className="bi bi-list"></i> More</NavLink>
                        </Nav>
                    </NavbarCollapse>
                </Container>
            </Navbar>
            <div className="bg-light">
                <Container>
                    <Collapse in={isOpen}>
                        <div className="w-100">
                            <div className="p-2"></div>
                            <input type="text" className="form-control taller-input" placeholder="Search for a movie or TV show" />
                            <div className="p-2"></div>
                        </div>
                    </Collapse>
                </Container>
            </div>
        </div>
    );
}