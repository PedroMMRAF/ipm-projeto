import React, { useState, useRef, useEffect } from "react";
import { Collapse, Container, Navbar, Nav, NavDropdown, Form } from "react-bootstrap";

import styles from "./PageNavbar.module.css";

import LoginModal, { useLoginState } from "@/components/LoginModal";

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
                <NavDropdown.Header className={styles.dropdownHeader}>Genres</NavDropdown.Header>
                <NavDropdown.Divider className={styles.dropdownDivider} />
                {visible.map((genre, i) => (
                    <NavDropdown.Item key={i} href={`${baseLink}&genres=${genre}`}>
                        {genre}
                    </NavDropdown.Item>
                ))}
                <Collapse in={isOpen}>
                    <div>
                        {hidden.map((genre, i) => (
                            <NavDropdown.Item key={i} href={`${baseLink}&genres=${genre}`}>
                                {genre}
                            </NavDropdown.Item>
                        ))}
                    </div>
                </Collapse>
                <NavDropdown.Item onClick={toggleCollapse}>Show {isOpen ? "Less" : "More"}...</NavDropdown.Item>
            </NavDropdownColumn>
            <NavDropdownColumn>
                <NavDropdown.Header className={styles.dropdownHeader}>Trending Topics</NavDropdown.Header>
                <NavDropdown.Divider className={styles.dropdownDivider} />
                <NavDropdown.Item href={`${baseLink}&sort=new`}>
                    <i class="bi bi-newspaper"></i> New {title}
                </NavDropdown.Item>
                <NavDropdown.Item href={`${baseLink}&sort=top`}>
                    <i class="bi bi-fire"></i> Top {title}
                </NavDropdown.Item>
                <NavDropdown.Item href={`${baseLink}&sort=throwback`}>
                <i class="bi bi-rewind-btn-fill"></i>Throwback {title}
                </NavDropdown.Item>
                <NavDropdown.Item href={`${baseLink}&sort=trending`}>
                    <i class="bi bi-ticket-detailed"></i> Trending {title}
                </NavDropdown.Item>
                <NavDropdown.Item href={`${baseLink}&sort=popular`}>
                    <i class="bi bi-film"></i> Popular {title}
                </NavDropdown.Item>
                <NavDropdown.Item href={`${baseLink}&sort=random`}>
                    <i class="bi bi-collection-fill"></i> Random {title}
                </NavDropdown.Item>
            </NavDropdownColumn>
        </NavDropdownMultiColumn>
    );
}

export default function PageNavbar() {
    const [isCollapsed, setCollapsed] = useState(true);

    const contentRef = useRef(null);
    const topRef = useRef(null);
    const navRef = useRef(null);

    const [showLogin, setShowLogin] = useState(false);
    const [loggedIn, setLoggedIn] = useLoginState();

    const toggleCollapse = () => {
        setCollapsed(!isCollapsed);

        if (contentRef.current) {
            contentRef.current.style.height = isCollapsed ? `${contentRef.current.scrollHeight}px` : "0px";
        }
    };

    useEffect(() => {
        let animationFrame;

        const synchronizeHeight = () => {
            if (navRef.current && topRef.current) {
                topRef.current.style.minHeight = window.getComputedStyle(navRef.current).height;
                animationFrame = requestAnimationFrame(synchronizeHeight);
            }
        };

        synchronizeHeight();

        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    return (
        <>
            <div ref={topRef}></div>
            <div ref={navRef} className="fixed-top">
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="/">MTVDB</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="container justify-content-between">
                            <Nav>
                                <Dropdown type="movies" title="Movies" genres={MOVIE_GENRES} />
                                <Dropdown type="tv" title="TV Shows" genres={TV_GENRES} />
                                <Nav.Link href="/near-you">Near You</Nav.Link>
                            </Nav>
                            <Nav>
                                {loggedIn ? (
                                    <NavDropdown
                                        title={
                                            <>
                                                <i className="bi bi-person-circle"></i> Account
                                            </>
                                        }
                                    >
                                        <NavDropdown.Item onClick={() => setLoggedIn(false)}>
                                            <i className="bi bi-box-arrow-right"></i> Log Out
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <Nav.Link onClick={() => setShowLogin(true)}>
                                        <i className="bi bi-person-circle"></i> Login
                                    </Nav.Link>
                                )}
                                <Nav.Link href="#" onClick={toggleCollapse}>
                                    <i className="bi bi-search"></i> Search
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <div ref={contentRef} className={"bg-light " + styles.collapse}>
                    <Form
                        className="container my-3"
                        onSubmit={(e) => {
                            e.preventDefault();
                            window.location.href = `/filters?search=${e.target[0].value}`;
                        }}
                    >
                        <Form.Control
                            type="text"
                            className="taller-input"
                            placeholder="Search for a movie or TV show"
                        />
                    </Form>
                </div>
            </div>

            <LoginModal loginState={[loggedIn, setLoggedIn]} showState={[showLogin, setShowLogin]} />
        </>
    );
}
