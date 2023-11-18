import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Nav, Button } from "react-bootstrap";
import { InfoWindow } from "@react-google-maps/api";

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
    const [infoWindow, setInfoWindow] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showLocationPopup, setShowLocationPopup] = useState(true);
    const [leftSidebarOpen, setleftSidebarOpen] = useState(true);
    const [rightSidebarOpen, setrightSidebarOpen] = useState(false);

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
        if (!rightSidebarOpen) toggleRightSidebar();
    };

    const selectMovieFromPin = (movie) => {
        moviePopUp(movie);
        setSelectedMovie(movie);
        if (!rightSidebarOpen) toggleRightSidebar();
    };

    const closeMovie = () => {
        toggleRightSidebar();
    };

    useEffect(() => {
        if (showLocationPopup) {
            alert("In order to use this feature, we need your location. Click OK if you agree.");
            setShowLocationPopup(false);
        }
    }, [showLocationPopup]);

    return (
        <div className={styles.page}>
            <title>Movies Near You</title>

            <PageNavbar />

            {/* <h2 className="text-center">Movies near You</h2> */}

            <div className={styles.map}>
                <AnimatingWidth condition={leftSidebarOpen}>
                    <CardDeck.Vertical
                        style={{ padding: "1rem" }}
                        cardItems={MOVIES}
                        childItem={(movie) => <MovieCard {...movie} onClick={() => selectMovie(movie)} />}
                    />
                </AnimatingWidth>

                <button className={styles.button} onClick={toggleLeftSidebar}>
                    {leftSidebarOpen ? <i className="bi bi-chevron-left"></i> : <i className="bi bi-chevron-right"></i>}
                </button>

                <GoogleMapComponent center={center} onClick={closeInfoWindow}>
                    <CustomMarker onClick={() => locationPopUp(center)} color="red" position={center} />
                    {MOVIES.map((movie, index) => (
                        <CustomMarker
                            key={index}
                            onClick={() => selectMovieFromPin(movie)}
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
                        <MovieCard
                            {...selectedMovie}
                            width={300}
                            onClick={() => {
                                window.location.href = "/movie-page";
                            }}
                        />
                    </div>
                </AnimatingWidth>
            </div>
        </div>
    );
}
