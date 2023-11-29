import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Nav, Button, Modal, Form } from "react-bootstrap";
import { InfoWindow } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import styles from "@/styles/near-you.module.css";

import CardDeck from "@/components/CardDeck";
import CustomMarker from "@/components/CustomMarker";
import GoogleMapComponent from "@/components/GoogleMapComponent";

import MOVIES from "@/const/movies.json";
import MovieCard from "@/components/MovieCard";
import PageNavbar from "@/components/PageNavbar";

const center = { lat: 38.66004943847656, lng: -9.203119277954102 };

function AnimatingWidth({ children, condition, style, ...props }) {
    const ref = useRef(null);

    useEffect(() => {
        let frameId;

        const handleResize = () => {
            if (ref.current) {
                ref.current.style.minWidth = condition
                    ? [...ref.current.children].reduce((acc, child) => acc + child.clientWidth, 0) + "px"
                    : "0px";
            }
            frameId = requestAnimationFrame(handleResize);
        };

        handleResize();

        return () => cancelAnimationFrame(frameId);
    }, [condition]);

    return (
        <div
            ref={ref}
            style={{
                overflow: "hidden",
                width: 0,
                transition: "min-width 0.2s ease-in-out",
                ...style,
            }}
            {...props}
        >
            {children}
        </div>
    );
}

export default function NearYouPage() {
    const [showModal, setShowModal] = useState();
    const [infoWindow, setInfoWindow] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [leftSidebarOpen, setleftSidebarOpen] = useState(true);
    const [rightSidebarOpen, setrightSidebarOpen] = useState(false);
   

    const Movies = MOVIES.filter((movie) => movie.marker != undefined);

    const handleAgree = () => {
        setShowModal(false);
    };

    const handleDisagree = () => {
        window.location.href = "/";
    };

    const toggleLeftSidebar = () => {
        setleftSidebarOpen(!leftSidebarOpen);
    };

    const toggleRightSidebar = () => {
        setrightSidebarOpen(!rightSidebarOpen);
    };

    const locationPopUp = (marker) => {
        setInfoWindow({
            position: marker,
            content: "You are Here!",
        });
    };

    const moviePopUp = (movie) => {
        setInfoWindow({
            position: movie.marker,
            content: movie.title + " Was Filmed Here!",
        });
    };

    const closeInfoWindow = () => {
        setInfoWindow(null);
    };

    const selectMovie = (movie) => {
        moviePopUp(movie);
        setSelectedMovie(movie);
        if (!rightSidebarOpen) toggleRightSidebar();
    };

    const closeMovie = () => {
        toggleRightSidebar();
    };

    useEffect(() => {
        setShowModal(true);
    }, []);

    return (
        <div className={styles.page}>
            <title>Movies Near You</title>

            <PageNavbar />
            
            <Modal show={showModal} centered>
                <Modal.Header>
                    <Modal.Title>Location Permission</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label className="p-0 m-2">
                            In order to use this feature, we need your location. Click Agree if you agree.
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
           

            {!showModal && (
                <div className={styles.map}>
                    <AnimatingWidth condition={leftSidebarOpen}>
                        <CardDeck.Vertical
                            style={{ padding: "1rem" }}
                            cardItems={Movies}
                            childItem={(movie) => <MovieCard {...movie} onClick={() => selectMovie(movie)} />}
                        />
                    </AnimatingWidth>

                    <button className={styles.button} onClick={toggleLeftSidebar}>
                        {leftSidebarOpen ? (
                            <i className="bi bi-chevron-left"></i>
                        ) : (
                            <i className="bi bi-chevron-right"></i>
                        )}
                    </button>

                    <GoogleMapComponent center={center} onClick={closeInfoWindow}>
                        <CustomMarker onClick={() => locationPopUp(center)} color="red" position={center} />
                        {MOVIES.map((movie, index) => (
                            <CustomMarker
                                key={index}
                                onClick={() => selectMovie(movie)}
                                color="lightblue"
                                position={movie.marker}
                            />
                        ))}
                        {infoWindow && (
                            <InfoWindow position={infoWindow.position} onCloseClick={closeInfoWindow}>
                                <div>{infoWindow.content}</div>
                            </InfoWindow>
                        )}
                    </GoogleMapComponent>

                    <AnimatingWidth condition={rightSidebarOpen} style={{ display: "flex" }}>
                        <button className={styles.button} onClick={closeMovie}>
                            <i className="bi bi-x-lg"></i>
                        </button>
                        <div className={styles.sidebarRight}>
                            <div>
                                <h2 className="text-center mb-3">Movie Details</h2>
                                <MovieCard
                                    {...selectedMovie}
                                    style={{ width: "300px" }}
                                    onClick={() => {
                                        window.location.href = `/movie-page?title=${selectedMovie.title}`;
                                    }}
                                />
                                <div style={{ textAlign: "center" }}>
                                    <Button
                                        onClick={() => {
                                            window.location.href = `/movie-page?title=${selectedMovie.title}`;
                                        }}
                                    >
                                        Redirect To Movie Page
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </AnimatingWidth>
                </div>
            )}
        </div>
    );
}

