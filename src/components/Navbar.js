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
import NavDropdownItem from 'react-bootstrap/DropdownItem';
import NavDropdownDivider from 'react-bootstrap/DropdownDivider';
import NavDropdownHeader from 'react-bootstrap/DropdownHeader';

import NavDropdownColumn from '@/components/NavDropdownColumn';
import NavDropdownMultiColumn from '@/components/NavDropdownMultiColumn';

import MOVIE_GENRES from '@/const/movie_genres';
import TV_GENRES from '@/const/tv_genres';


function Dropdown({ type, title, genres }) {
    let visible = genres.slice(0, 5);
    let hidden = genres.slice(5);

    let [isOpen, setIsOpen] = useState(false);

    const toggleCollapse = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    }

    let baseLink = `/filters?type=${type}`;

    return (
        <NavDropdownMultiColumn title={title} onToggle={() => setIsOpen(false)}>
            <NavDropdownColumn>
                <NavDropdownHeader>Genres</NavDropdownHeader>
                <NavDropdownDivider />
                {visible.map((genre, i) => (
                    <NavDropdownItem key={i} href={`${baseLink}&genre=${genre}`}>{genre}</NavDropdownItem>
                ))}
                <Collapse in={isOpen}>
                    <div>
                        {hidden.map((genre, i) => (
                            <NavDropdownItem key={i} href={`${baseLink}&genre=${genre}`}>{genre}</NavDropdownItem>
                        ))}
                    </div>
                </Collapse>
                <NavDropdownItem onClick={toggleCollapse}>
                    Show {isOpen ? "Less" : "More"}...
                </NavDropdownItem>
            </NavDropdownColumn>
            <NavDropdownColumn>
                <NavDropdownHeader>Trending Topics</NavDropdownHeader>
                <NavDropdownDivider />
                <NavDropdownItem href={`${baseLink}&sort=new`} >New {title}</NavDropdownItem>
                <NavDropdownItem href={`${baseLink}&sort=top`}>Top {title}</NavDropdownItem>
                <NavDropdownItem href={`${baseLink}&sort=throwback`}>Throwback {title}</NavDropdownItem>
                <NavDropdownItem href={`${baseLink}&sort=trending`}>Trending {title}</NavDropdownItem>
                <NavDropdownItem href={`${baseLink}&sort=popular`}>Popular {title}</NavDropdownItem>
                <NavDropdownItem href={`${baseLink}&sort=random`}>Random {title}</NavDropdownItem>
            </NavDropdownColumn>
        </NavDropdownMultiColumn>
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
                    <NavbarBrand href="/">MTVDB</NavbarBrand>
                    <NavbarToggle aria-controls="basic-navbar-nav" />
                    <NavbarCollapse id="basic-navbar-nav" className="container justify-content-between">
                        <Nav>
                            <Dropdown type="movie" title="Movies" genres={MOVIE_GENRES} />
                            <Dropdown type="tv" title="TV Shows" genres={TV_GENRES} />
                            <NavLink href="/nearyou">Near You</NavLink>
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