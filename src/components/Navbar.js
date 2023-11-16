import React, { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import styles from "./Navbar.module.css";

import TV_GENRES from "@/const/tv-genres.json";
import MOVIE_GENRES from "@/const/movie-genres.json";


function NavDropdownMultiColumn({ children, ...params }) {
    return (
        <NavDropdown {...params}>
            <div className={styles.dropdownMulticol}>{children}</div>
        </NavDropdown>
    );
}

function NavDropdownColumn({ children, className, ...params }) {
    return (
        <div className={styles.dropdownCol + " " + className} {...params}>
            {children}
        </div>
    );
}

function Dropdown({ type, title, genres }) {
    let visible = genres.slice(0, 5);
    let hidden = genres.slice(5);

    let [isOpen, setIsOpen] = useState(false);

    const toggleCollapse = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    let baseLink = `/filters?type=${type}`;

    return (
        <NavDropdownMultiColumn title={title} onToggle={() => setIsOpen(false)}>
            <NavDropdownColumn>
                <NavDropdown.Header className={styles.dropdownHeader}>
                    Genres
                </NavDropdown.Header>
                <NavDropdown.Divider className={styles.dropdownDivider} />
                {visible.map((genre, i) => (
                    <NavDropdown.Item
                        key={i}
                        href={`${baseLink}&genres=${genre}`}
                    >
                        {genre}
                    </NavDropdown.Item>
                ))}
                <Collapse in={isOpen}>
                    <div>
                        {hidden.map((genre, i) => (
                            <NavDropdown.Item
                                key={i}
                                href={`${baseLink}&genres=${genre}`}
                            >
                                {genre}
                            </NavDropdown.Item>
                        ))}
                    </div>
                </Collapse>
                <NavDropdown.Item onClick={toggleCollapse}>
                    Show {isOpen ? "Less" : "More"}...
                </NavDropdown.Item>
            </NavDropdownColumn>
            <NavDropdownColumn>
                <NavDropdown.Header className={styles.dropdownHeader}>
                    Trending Topics
                </NavDropdown.Header>
                <NavDropdown.Divider className={styles.dropdownDivider} />
                <NavDropdown.Item href={`${baseLink}&sort=new`}>
                    New {title}
                </NavDropdown.Item>
                <NavDropdown.Item href={`${baseLink}&sort=top`}>
                    Top {title}
                </NavDropdown.Item>
                <NavDropdown.Item href={`${baseLink}&sort=throwback`}>
                    Throwback {title}
                </NavDropdown.Item>
                <NavDropdown.Item href={`${baseLink}&sort=trending`}>
                    Trending {title}
                </NavDropdown.Item>
                <NavDropdown.Item href={`${baseLink}&sort=popular`}>
                    Popular {title}
                </NavDropdown.Item>
                <NavDropdown.Item href={`${baseLink}&sort=random`}>
                    Random {title}
                </NavDropdown.Item>
            </NavDropdownColumn>
        </NavDropdownMultiColumn>
    );
}

export default function MyNavbar() {
    let [isOpen, setIsOpen] = useState(false);

    const toggleCollapse = (e) => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="fixed-top">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">MTVDB</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse
                        id="basic-navbar-nav"
                        className="container justify-content-between"
                    >
                        <Nav>
                            <Dropdown
                                type="movies"
                                title="Movies"
                                genres={MOVIE_GENRES}
                            />
                            <Dropdown
                                type="tv"
                                title="TV Shows"
                                genres={TV_GENRES}
                            />
                            <Nav.Link href="/near-you">Near You</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#">
                                <i className="bi bi-person-circle"></i> Login
                            </Nav.Link>
                            <Nav.Link href="#" onClick={toggleCollapse}>
                                <i className="bi bi-search"></i> Search
                            </Nav.Link>
                            <Nav.Link href="#">
                                <i className="bi bi-list"></i> More
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="bg-light">
                <Container>
                    <Collapse in={isOpen}>
                        <div className="w-100">
                            <div className="p-2"></div>
                            <input
                                type="text"
                                className="form-control taller-input"
                                placeholder="Search for a movie or TV show"
                            />
                            <div className="p-2"></div>
                        </div>
                    </Collapse>
                </Container>
            </div>
        </div>
    );
}
