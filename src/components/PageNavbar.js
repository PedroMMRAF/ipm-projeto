import React, { useState, useRef, useEffect } from "react";
import { Collapse, Container, Navbar, Nav, NavDropdown, Form, Modal } from "react-bootstrap";

import styles from "./PageNavbar.module.css";

import LoginModal, { useLoginState } from "@/components/LoginModal";

import TV_GENRES from "@/const/tv-genres.json";
import MOVIE_GENRES from "@/const/movie-genres.json";

export const SORTING = {
    popular: (
        <>
            <i className="bi bi-film"></i> Popular
        </>
    ),
    trending: (
        <>
            <i className="bi bi-ticket-detailed"></i> Trending
        </>
    ),
    top: (
        <>
            <i className="bi bi-fire"></i> Best
        </>
    ),
    new: (
        <>
            <i className="bi bi-newspaper"></i> Newest
        </>
    ),
    throwback: (
        <>
            <i className="bi bi-rewind-btn-fill"></i> Throwback
        </>
    ),
    random: (
        <>
            <i className="bi bi-collection-fill"></i> Random
        </>
    ),
};

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
                {Object.entries(SORTING).map(([key, value]) => (
                    <NavDropdown.Item key={key} href={`${baseLink}&sort=${key}`}>
                        {value} {title}
                    </NavDropdown.Item>
                ))}
            </NavDropdownColumn>
        </NavDropdownMultiColumn>
    );
}

export default function PageNavbar() {
    const [isCollapsed, setCollapsed] = useState(true);
    const [showLogOutModal, setShowLogOutModal] = useState(false);

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

    const handleAgree = () => {
        setShowLogOutModal(false);
        setLoggedIn(false)
    };
    const handleDisagree = () => {
        setShowLogOutModal(false);

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
            <Modal show={showLogOutModal} centered>
                <Modal.Header>
                    <Modal.Title>Log Out Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label className="p-0 m-2">
                            Are you sure you want to Log Out?
                        </Form.Label>
                    </Form>
                    <button className="mt-3 btn btn-primary" onClick={handleDisagree}>
                        Disagree
                    </button>
                    <button className="mt-3 ms-1 btn btn-primary" onClick={handleAgree}>
                        Agree
                    </button>
                </Modal.Body>
            </Modal>
            <div ref={navRef} className="fixed-top">
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="/">MTVDB</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="container justify-content-between">
                            <Nav>
                                <Dropdown type="movies" title="Movies" genres={MOVIE_GENRES} />
                                <Dropdown type="tv" title="TV Shows" genres={TV_GENRES} />
                                <Nav.Link href="/near-you">
                                    <i className="bi bi-globe"></i> Near You
                                </Nav.Link>
                                <Nav.Link href="/filters">
                                    <i className="bi bi-funnel"></i> Advanced Search
                                </Nav.Link>
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
                                        <NavDropdown.Item onClick={() => {
                                            window.location.href = `/watchlist-page`;
                                        }}>
                                            <i className="bi bi-journal-bookmark-fill"></i> Watchlist
                                        </NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => setShowLogOutModal(true)}>
                                            <i className="bi bi-box-arrow-right"></i> Log Out
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <Nav.Link onClick={() => setShowLogin(true)}>
                                        <i className="bi bi-person-circle"></i> Login
                                    </Nav.Link>
                                )}

                                <Nav.Link onClick={toggleCollapse} >
                                    <><i className="bi bi-search"></i> Search</>
                                    <i className="bi bi-caret-down-fill" style={{ fontSize: "11px" }} ></i>
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
            </div >

            <LoginModal loginState={[loggedIn, setLoggedIn]} showState={[showLogin, setShowLogin]} />
        </>
    );
}

