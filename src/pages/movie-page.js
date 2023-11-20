import React, { useState, useEffect } from "react";
import { Chip } from "@mui/material";
import { Col, Row, Image, Card, Container } from "react-bootstrap";

import CardDeck from "@/components/CardDeck";
import ActorCard from "@/components/ActorCard";
import PageNavbar from "@/components/PageNavbar";
import ReviewModal from "@/components/ReviewModal";
import TrailerModal from "@/components/TrailerModal";
import LoginModal, { useLoginState } from "@/components/LoginModal";

import styles from "@/styles/movie-page.module.css";

import TV from "@/const/tv-shows.json";
import MOVIES from "@/const/movies.json";

const MEDIA = [...MOVIES, ...TV];

export default function MoviePage() {
    const [movie, setMovie] = useState(null);
    const [review, setReview] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const title = params.get("title");
        const foundMovie = MEDIA.find((movie) => movie.title === title);
        console.log(foundMovie);
        setMovie(foundMovie);
    }, []);

    return (
        <div>
            <PageNavbar />
            {!movie ? (
                <></>
            ) : (
                <>
                    <Headline movie={movie} review={review} setReview={setReview} />
                    <Container>
                        <Row>
                            <Col md={9} sm={9}>
                                <Body movie={movie} review={review} />
                            </Col>
                            <Col md={3} sm={3} className={styles.sidebody}>
                                <Sidebody movie={movie} />
                            </Col>
                        </Row>
                    </Container>
                </>
            )}
        </div>
    );
}

function Headline({ movie, review, setReview }) {
    // Modal states
    const [showLogin, setShowLogin] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [showTrailer, setShowTrailer] = useState(false);

    // Login state
    const [loggedIn, setLoggedIn] = useLoginState();

    const [isBookmarked, setBookmark] = useState(null);
    const [willBookmark, setWillBookmark] = useState(null);

    const [rating, setRating] = useState(0);
    const [willReview, setWillReview] = useState(null);

    useEffect(() => {
        const storedReviews = JSON.parse(localStorage.getItem("reviews") || "{}");
        setReview(storedReviews[movie.title] || null);

        const bookmarkList = JSON.parse(localStorage.getItem("bookmarks") || "{}");
        setBookmark(bookmarkList[movie.title] || false);
    }, []);

    useEffect(() => {
        if (isBookmarked === null) return;

        let bookmarkList = JSON.parse(localStorage.getItem("bookmarks") || "{}");
        bookmarkList[movie.title] = isBookmarked;
        localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
    }, [isBookmarked]);

    useEffect(() => {
        if (showLogin) return;

        if (willBookmark && loggedIn) {
            setBookmark(true);
        }

        if (willReview && loggedIn && review == null) {
            handleShowReview();
        }

        setWillBookmark(false);
        setWillReview(false);
    }, [showLogin]);

    useEffect(() => {
        let raters = movie["reviews"].length;
        let storedRating = movie["reviews"].reduce((acc, review) => acc + parseInt(review.rating), 0);

        if (review) {
            storedRating += review.rating;
            raters++;
        }

        setRating(storedRating / raters);

        localStorage.setItem(
            "reviews",
            JSON.stringify({
                ...JSON.parse(localStorage.getItem("reviews") || "{}"),
                [movie.title]: review,
            }),
        );
    }, [review]);

    const handleShowReview = () => {
        if (review == null) {
            setShowReview(true);
        } else {
            setReview(null);
        }
    };

    return (
        <>
            <LoginModal loginState={[loggedIn, setLoggedIn]} showState={[showLogin, setShowLogin]} />

            <ReviewModal
                movie={movie}
                show={showReview}
                onClose={() => setShowReview(false)}
                onChange={(reviewRating, reviewText) =>
                    setReview({
                        profileImage:
                            "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
                        author: "eu",
                        review: reviewText,
                        rating: reviewRating,
                    })
                }
            />

            <div
                className={styles.div}
                style={{
                    backgroundImage: `url(${movie["background-image"]})`,
                }}
            >
                <div className={styles.cover} style={{ backgroundImage: movie["cover"] }}>
                    <Container className="d-flex">
                        <div className="flex-grow-0 me-5" style={{ width: "fit-content" }}>
                            <Image src={movie["poster"]} style={{ height: "500px" }} rounded />
                        </div>
                        <div className="my-auto">
                            <div className="mb-4">
                                <h2>{movie["title"]}</h2>
                                <div>
                                    <span className={styles.span}>{movie["rated"]}</span>
                                    <span className={styles.span}>{movie["year"]}</span>
                                    <span className={styles.span}> &#x2022; {movie["genres"]}</span>
                                    <span className={styles.span}> &#x2022; {movie["runtime"]}</span>
                                </div>
                            </div>
                            <Row className="ms-0 align-items-center">
                                <Col className="ps-0 pe-4 flex-grow-0 d-flex align-items-center">
                                    <TextIcon
                                        fs={2}
                                        icon="star-fill"
                                        iconColor="yellow"
                                        text={`${rating}/5`}
                                    ></TextIcon>
                                </Col>
                                <Col className="ps-0 pe-4 flex-grow-0">
                                    <div onClick={() => setShowTrailer(true)} style={{ cursor: "pointer" }}>
                                        <TextIcon icon="play" text="Play Trailer"></TextIcon>
                                    </div>
                                    <TrailerModal
                                        movie={movie}
                                        show={showTrailer}
                                        onHide={() => setShowTrailer(false)}
                                    />
                                </Col>
                                <Col className="ps-0 pe-4 flex-grow-0">
                                    {loggedIn ? (
                                        <div
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                                setBookmark(!isBookmarked);
                                            }}
                                        >
                                            <TextIcon
                                                fs={3}
                                                icon={isBookmarked ? "bookmark-star-fill" : "bookmark-plus"}
                                                text="Add To Watchlist"
                                            ></TextIcon>
                                        </div>
                                    ) : (
                                        <div
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                                setShowLogin(true);
                                                setWillBookmark(true);
                                            }}
                                        >
                                            <TextIcon fs={3} icon="bookmark-plus" text="Add To Watchlist"></TextIcon>
                                        </div>
                                    )}
                                </Col>
                                <Col className="ps-0 pe-4 flex-grow-0">
                                    {loggedIn ? (
                                        <div onClick={handleShowReview} style={{ cursor: "pointer" }}>
                                            <TextIcon
                                                icon={review != null ? "star-fill" : "star"}
                                                text="Review"
                                            ></TextIcon>
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => {
                                                setShowLogin(true);
                                                setWillReview(true);
                                            }}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <TextIcon icon="star" text="Review"></TextIcon>
                                        </div>
                                    )}
                                </Col>
                            </Row>
                            <div>
                                <h5
                                    className="my-4"
                                    style={{
                                        color: "var(--bs-gray-500)",
                                    }}
                                >
                                    <i>{movie["quote"]}</i>
                                </h5>
                                <h5>Overview</h5>
                                <p>{movie["plot"]}</p>

                                <Row>
                                    {movie["writer"].map((colaborator, i) => (
                                        <Col key={i} className="text-nowrap flex-grow-0">
                                            <div style={{ fontSize: "14px", marginTop: "2vh" }}>{colaborator}</div>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    );
}

function Body({ movie, review }) {
    return (
        <div>
            <div style={{ marginTop: "2%" }}>
                <h3>Top Actors</h3>
                <CardDeck.Horizontal cardItems={movie["actors"]} childItem={(actor) => <ActorCard {...actor} />} />
            </div>
            <hr className={styles.hr} />
            <div className="reviewList" style={{ overflowY: "auto", maxHeight: "90vh" }}>
                {review && <ReviewCard {...review} />}
                {movie.reviews.map((review, i) => (
                    <ReviewCard key={i} {...review} />
                ))}
            </div>
        </div>
    );
}

function ReviewCard({ author, review, rating, profileImage }) {
    return (
        <Card style={{ marginTop: "2vh", marginBottom: "2vh" }}>
            <Card.Header>
                <Image
                    src={profileImage}
                    style={{ width: "32px", height: "32px", borderRadius: "50%", marginRight: "32px" }}
                />{" "}
                <b style={{ fontSize: "110%" }}>A review by {author} </b>
            </Card.Header>
            <Card.Body>
                <Card.Title>
                    <Chip
                        label={
                            <>
                                <i className="bi bi-star-fill"></i> <span>{rating}</span>
                            </>
                        }
                    />
                </Card.Title>
                <Card.Text>{review}</Card.Text>
            </Card.Body>
        </Card>
    );
}

function Sidebody({ movie }) {
    return (
        <div>
            <Container>
                <div>
                    <div>
                        <strong>
                            <bdi>Released</bdi>
                        </strong>
                        <p>{movie["released"]}</p>
                    </div>
                    <div>
                        <strong>
                            <bdi>Original Language</bdi>
                        </strong>
                        <p>{movie["language"]}</p>
                    </div>
                    <div>
                        <strong>
                            <bdi>Budget</bdi>
                        </strong>
                        <p>{movie["budget"]}</p>
                    </div>
                    <div>
                        <strong>
                            <bdi>Revenue</bdi>
                        </strong>
                        <p>{movie["box-office"]}</p>
                    </div>
                </div>
            </Container>
        </div>
    );
}

function TextIcon({ fs = 2, icon, iconColor = undefined, text }) {
    return (
        <div className="text-nowrap d-flex align-items-center">
            <i className={`me-2 fs-${fs} bi bi-${icon}`} style={{ color: iconColor }}></i> <div>{text}</div>
        </div>
    );
}
