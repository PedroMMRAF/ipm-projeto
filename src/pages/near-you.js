import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { InfoWindow } from "@react-google-maps/api";

import styles from "@/styles/near-you.module.css";

import CardDeck from "@/components/CardDeck";
import CustomMarker from "@/components/CustomMarker";
import GoogleMapComponent from "@/components/GoogleMapComponent";

import MOVIES from "@/const/movies.json";
import MovieCard from "@/components/MovieCard";
import PageNavbar from "@/components/PageNavbar";

const center = { lat: 38.66004943847656, lng: -9.203119277954102 };

function SelectedMovie({ selectedMovie, closeMovie }) {
    if (!selectedMovie) return <></>;

    return (
        <>
            <MovieCard {...selectedMovie} width={300} />
            <button className={styles.closeButton} onClick={closeMovie} style={{ zIndex: 1000 }}>
                X
            </button>
            <a href="/movie-page">
                <div className={styles.pageLink}>Redirect to Movie Page</div>
            </a>
        </>
    );
}

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
            alert("In order to use this feature, we need your location. Click OK if you agree.");
            setShowLocationPopup(false);
        }
    }, [showLocationPopup]);

    return (
        <>
            <title>Movies Near You</title>
            <PageNavbar />
            <Container fluid>
                <Row>
                    <Col>
                        <h2 className="text-center">Movies near You</h2>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <CardDeck.Vertical
                            style={{
                                marginLeft: "auto",
                                marginRight: 0,
                            }}
                            cardItems={MOVIES}
                            childItem={(movie) => <MovieCard {...movie} onClick={() => selectMovie(movie)} />}
                        />
                    </Col>
                    <Col xs={1} className={styles.map}>
                        <GoogleMapComponent center={center}>
                            <CustomMarker onClick={() => locationPopUp(center)} color="red" position={center} />
                            {MOVIES.map((movie, index) => (
                                <CustomMarker
                                    key={index}
                                    onClick={() => selectMovieFromPin(movie)}
                                    color="blue"
                                    position={movie.marker}
                                />
                            ))}

                            {infoWindow && (
                                <InfoWindow position={infoWindow.position} onCloseClick={closeInfoWindow}>
                                    <div>{infoWindow.content}</div>
                                </InfoWindow>
                            )}
                        </GoogleMapComponent>
                    </Col>
                    <Col className="align-items-center">
                        <SelectedMovie selectedMovie={selectedMovie} closeMovie={closeMovie} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}
