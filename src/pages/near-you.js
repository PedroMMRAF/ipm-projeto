import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { InfoWindow } from "@react-google-maps/api";

import styles from "@/styles/map.module.css";

import MyNavbar from "@/components/Navbar";
import CardDeck from "@/components/CardDeck";
import CustomMarker from "@/components/CustomMarker";
import GoogleMapComponent from "@/components/GoogleMapComponent";

import MOVIES from "@/const/movies.json";

const center = { lat: 38.66004943847656, lng: -9.203119277954102 };

export default function NearYouPage() {
    const [infoWindow, setInfoWindow] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showLocationPopup, setShowLocationPopup] = useState(true);

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
        setSelectedMovie(movie);
        moviePopUp(movie);
    };
    const selectMovieFromPin = (movie) => {
        setSelectedMovie(movie);
    };

    const closeMovie = () => {
        setSelectedMovie(null);
    };

    useEffect(() => {
        if (showLocationPopup) {
            alert(
                "In order to use this feature, we need your location. Click OK if you agree.",
            );
            setShowLocationPopup(false);
        }
    }, [showLocationPopup]);

    return (
        <div>
            <title>Movies Near You</title>
            <h2 className="text-center">Movies near You</h2>
            <MyNavbar />
            <Container fluid>
                <Row>
                    <div className="col-3">
                        <CardDeck.Vertical
                            onMovieClick={selectMovie}
                            movies={MOVIES}
                        />
                    </div>

                    <div className={`col-9 ${styles.map}`}>
                        <GoogleMapComponent center={center}>
                            <CustomMarker
                                onClick={() => locationPopUp(center)}
                                color="red"
                                position={center}
                            />
                            <CustomMarker
                                onClick={() => selectMovieFromPin(MOVIES[0])}
                                color="blue"
                                position={MOVIES[0].marker}
                            />
                            <CustomMarker
                                onClick={() => selectMovieFromPin(MOVIES[1])}
                                color="blue"
                                position={MOVIES[1].marker}
                            />
                            <CustomMarker
                                onClick={() => selectMovieFromPin(MOVIES[2])}
                                color="blue"
                                position={MOVIES[2].marker}
                            />
                            <CustomMarker
                                onClick={() => selectMovieFromPin(MOVIES[3])}
                                color="blue"
                                position={MOVIES[3].marker}
                            />

                            {infoWindow && (
                                <InfoWindow
                                    position={infoWindow.position}
                                    onCloseClick={closeInfoWindow}
                                >
                                    <div>{infoWindow.content}</div>
                                </InfoWindow>
                            )}
                        </GoogleMapComponent>
                    </div>

                    {selectedMovie && (
                        <div className="col-2">
                            <div className={styles.expandedMovie}>
                                <img
                                    src={selectedMovie.image}
                                    alt={selectedMovie.title}
                                />
                                <div className={styles.overlay}>
                                    <div className={styles.cardText}>
                                        {selectedMovie.title}
                                    </div>
                                </div>
                            </div>
                            <button
                                style={{
                                    position: "relative",
                                    bottom: "450px",
                                    left: "10px",
                                    cursor: "pointer",
                                }}
                                onClick={closeMovie}
                            >
                                X
                            </button>
                            <a href="/moviePage">
                                <div className={styles.pageLink}>
                                    Redirect to Movie Page
                                </div>
                            </a>
                        </div>
                    )}
                </Row>
            </Container>
        </div>
    );
}
