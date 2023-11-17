import React, { useState, useEffect } from "react";
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

function SelectedMovie({ selectedMovie, closeMovie }) {
    if (!selectedMovie) return <></>;

    return (
        <>
            <MovieCard {...selectedMovie} width={300} />

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
    const [leftsidebarOpen, setleftSidebarOpen] = useState(true);
    const [rightsidebarOpen, setrightSidebarOpen] = useState(false);


    const toggleLeftSidebar = () => {
        setleftSidebarOpen(!leftsidebarOpen);
    };
    const toggleRightSidebar = () => {
        setrightSidebarOpen(!rightsidebarOpen);
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
        setSelectedMovie(movie);
        moviePopUp(movie);
        if(selectedMovie ==null)
        toggleRightSidebar()
    };
    const selectMovieFromPin = (movie) => {
        setSelectedMovie(movie);
        if(selectedMovie ==null)
        toggleRightSidebar()
    };

    const closeMovie = () => {
        setSelectedMovie(null);
        toggleRightSidebar()
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
        <>



            <title>Movies Near You</title>
            <PageNavbar />
            <Container fluid className="justify-content-md-center">
                <Row>
                    <h2 className="text-center">Movies near You</h2>
                </Row>

                <Row>
                    <div className={styles.map }>
                    <Button onClick={toggleLeftSidebar}>
                            Show {leftsidebarOpen ? "Less" : "More"}...
                            </Button>
                        <GoogleMapComponent center={center}>
                            
                            {leftsidebarOpen && (<div  className={styles.sidebarLeft}>
                                {/* Left Sidebar */}
                                <CardDeck.Vertical
                                    onMovieClick={selectMovie}
                                    movies={MOVIES}
                                />
                            </div >)}
                            <CustomMarker
                                onClick={() => locationPopUp(center)}
                                color="red"
                                position={center}
                            />
                            {MOVIES.map((movie, index) => (
                                <CustomMarker
                                    key={index}
                                    onClick={() => selectMovieFromPin(movie)}
                                    color="blue"
                                    position={movie.marker}
                                />
                            ))}

                            {infoWindow && (
                                <InfoWindow
                                    position={infoWindow.position}
                                    onCloseClick={closeInfoWindow}
                                >
                                    <div>{infoWindow.content}</div>
                                </InfoWindow>
                            )}

                            {rightsidebarOpen && (
                                <div xs={3} className={styles.sidebarRight}>
                                    {/* Right Sidebar */}
                                    <Button variant="danger" onClick={closeMovie}>
                                        Close Movie
                                    </Button>
                                    <SelectedMovie
                                        selectedMovie={selectedMovie}
                                        closeMovie={closeMovie}
                                    />
                                </div>
                            )}
                        </GoogleMapComponent>

                    </div>



                </Row>






            </Container>
        </>
    );
}
