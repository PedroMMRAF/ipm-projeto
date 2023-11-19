import React, { useState, useRef, useEffect } from "react";
import Collapse from "react-bootstrap/Collapse";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import styles from "./PageNavbar.module.css";

import TV_GENRES from "@/const/tv-genres.json";
import MOVIE_GENRES from "@/const/movie-genres.json";
import { Form,Button,Modal } from "react-bootstrap";

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
                <NavDropdown.Item href={`${baseLink}&sort=new`}><i class="bi bi-newspaper"></i>New {title}</NavDropdown.Item>
                <NavDropdown.Item href={`${baseLink}&sort=top`}><i class="bi bi-fire"></i>Top {title}</NavDropdown.Item>
                <NavDropdown.Item href={`${baseLink}&sort=throwback`}><i class="bi bi-archive-fill"></i>Throwback {title}</NavDropdown.Item>
                <NavDropdown.Item href={`${baseLink}&sort=trending`}><i class="bi bi-ticket-detailed"></i> Trending {title}</NavDropdown.Item>
                <NavDropdown.Item href={`${baseLink}&sort=popular`}><i class="bi bi-film"></i>Popular {title}</NavDropdown.Item>
                <NavDropdown.Item href={`${baseLink}&sort=random`}><i class="bi bi-collection-fill"></i>Random {title}</NavDropdown.Item>
            </NavDropdownColumn>
        </NavDropdownMultiColumn>
    );
}

export default function PageNavbar() {
    const [isCollapsed, setCollapsed] = useState(true);
    const contentRef = useRef(null);
    const topRef = useRef(null);
    const navRef = useRef(null);
    const logOutref= useRef(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [loggedIn, setloggedIn] = useState(false);
    const [showLogOut, setShowLogOut] = useState(false);
    const LoginModal = ({ show, handleClose }) => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
      
        const handleLogin = () => {
          setloggedIn(true);
          console.log('Logging in with:', username, password);
          // Close the modal after login
          handleClose();
        };
        
      
        return (
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
      
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
      
                <Button variant="primary" onClick={handleLogin}>
                  Login
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        );
      };
      const handleShowLoginModal = () => {
        if(!loggedIn){
        setShowLoginModal(true);
        console.log("TOOO");
        }
      };
      const toggleCollapseLogOut = () => {
        setShowLogOut(!showLogOut);
        console.log(showLogOut)
        if (logOutref.current) {
            logOutref.current.style.height = showLogOut ? `${logOutref.current.scrollHeight}px` : "0px";
          
        }
      }
      const handleCloseShowLogOut = () => {
        setShowLogOut(false);
        setloggedIn(false);
        toggleCollapseLogOut();
      }
    
      const handleCloseLoginModal = () => {
        setShowLoginModal(false);
      
      };
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
                                <Nav.Link href="#" onClick={loggedIn ? toggleCollapseLogOut : handleShowLoginModal}>
                                    <i className="bi bi-person-circle"></i> {loggedIn ? "Account" : "Login"}
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
                <div ref={contentRef} className={"bg-light " + styles.collapse}>
                    <Form className="container my-3">
                        <Form.Control
                            type="text"
                            className="taller-input"
                            placeholder="Search for a movie or TV show"
                        />
                    </Form>
                </div>
                  <div ref={logOutref} className={"bg-light " + styles.collapse}>
                  <Button onClick={handleCloseShowLogOut}>Log Out</Button> 
                </div>
                {(showLoginModal && <LoginModal show={showLoginModal} handleClose={handleCloseLoginModal} />)}
            </div>
        </>
    );
}
