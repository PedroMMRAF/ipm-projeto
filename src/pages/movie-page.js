import MyNavbar from "@/components/PageNavbar";

import { useState, React, useEffect } from 'react';

import {
    Col,
    Row,
    Image,
    Card,
    Button,
    Modal,
    Container,
    Form,
} from "react-bootstrap";

import CardDeck from "@/components/CardDeck";
import ActorCard from "@/components/ActorCard";

import { Rating, Typography, Chip } from "@mui/material";

import PropTypes from "prop-types";

import styles from "@/styles/movie-page.module.css"
import MOVIES from "@/const/movies.json"


export default function MoviePage() {

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const params = new URLSearchParams(location.search);
            const title = params.get("title")
            const foundMovie = MOVIES.find(movie => movie.title === title);
            setMovie(foundMovie);
            setLoading(false);
        };
        fetchData();
    }, []);


    return (
        <div>
            <MyNavbar />
            {loading ? <div /> : <Headline movie={movie} />}
            <Container>
                <Row>
                    <Col md={9} sm={9}>
                        {loading ? <div /> : <Body movie={movie} />}
                    </Col>
                    <Col className={styles.sidebody} md={3} sm={3}>
                        {loading ? <div /> : <Sidebody movie={movie} />}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

// The element containing everything within the movie background image
function Headline({ movie }) {
    const [review, setReview] = useState(null);

    useEffect(() => {
        const storedReview = localStorage.getItem("review");
        if (storedReview) {
            setReview(JSON.parse(storedReview));
        }
    }, []);

    let rating = 0;
    movie["reviews"].map((review, i) => (
        rating += parseInt(review["rating"])
    ))

    if (!review) {
        rating = rating / movie["reviews"].length
    } else {
        rating = (rating + review["rating"]) / (movie["reviews"].length + 1)
    }

    const [isBookmarked, setBookmark] = useState(false);

    const addToWatchlist = () => {
        if (loggedIn) {
            if (isBookmarked) {
                let bookmarkList = JSON.parse(localStorage.getItem("bookmarks"))
                if (bookmarkList == null)
                    bookmarkList = []
                bookmarkList[movie.title] = null //?
                localStorage.setItem("bookmarks", JSON.stringify(bookmarkList))
                setBookmark(false)
            } else {
                let bookmarkList = JSON.parse(localStorage.getItem("bookmarks"))
                if (bookmarkList == null)
                    bookmarkList = []
                bookmarkList[movie.title] = movie
                localStorage.setItem("bookmarks", JSON.stringify(bookmarkList))
                setBookmark(true)
            }
        }
    }

    const [loggedIn, setLoggedIn] = useState(false);

    const [show, setShow] = useState(false);
    const handleLogin = () => {
        window.localStorage.setItem("loggedIn", true);
        setLoggedIn(true);
        handleCloseLoginModal();
    };

    const handleShow = () => {
        let isLogged = window.localStorage.getItem("loggedIn");
        if (isLogged == null || !isLogged) {
            setShow(true)
        } else {
            setLoggedIn(true);
            setShow(false)
        }
    }

    const handleCloseLoginModal = () => {
        setShow(false);
    };

    return (
        <div
            className={styles.div}
            style={{
                backgroundImage: `url(${movie["background-image"]})`,
            }}
        >
            <div className={styles.cover} style={{ backgroundImage: movie["cover"] }}>
                <Container>
                    <div>
                        <Row>
                            <Col xs={4} className={styles.content}>
                                <div>
                                    <Image src={movie["poster"]} style={{ height: "70vh" }} rounded />
                                </div>
                            </Col>
                            <Col xs={8} className={styles.content} style={{ marginTop: "12vh" }}>
                                <div style={{ marginLeft: "1vh" }}>
                                    <div style={{ marginBottom: "3vh" }}>
                                        <h2>{movie["title"]}</h2>
                                        <div>
                                            <span className={styles.span}>{movie["rated"]}</span>
                                            <span className={styles.span}>{movie["year"]}</span>
                                            <span className={styles.span}>&#x2022; {movie["genres"].map((genre, i) => (genre + " "))}</span>
                                            <span className={styles.span}>&#x2022; {movie["runtime"]}</span>
                                        </div>
                                    </div>
                                    <div style={{ marginLeft: "-2vw" }}>
                                        <Row>
                                            <Col xs={3}>
                                                <svg
                                                    style={{ height: "8vh", width: "8vw", color: "yellow" }}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    className="ipc-icon ipc-icon--star sc-bde20123-4 frBGmx"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    role="presentation"
                                                >
                                                    <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                                                </svg>
                                                <span style={{ marginLeft: "-1.5vw" }}>{rating}/5</span>
                                            </Col>
                                            <Col xs={3} >
                                                <TrailerModal movie={movie} />
                                            </Col>
                                            <Col xs={3} onClick={handleShow}>
                                                <div style={{ marginTop: "2vh", marginLeft: "-5vw", cursor: "pointer" }} onClick={addToWatchlist}>
                                                    {isBookmarked ? <i class="bi bi-bookmark-star-fill"></i> : <i className="bi bi-bookmark-plus"></i>} Add To Watchlist
                                                </div>
                                            </Col>
                                            <Col xs={3} onClick={handleShow}>
                                                <ReviewModal movie={movie} loggedIn={loggedIn} />
                                            </Col>
                                            <Modal show={show} onHide={handleCloseLoginModal} centered>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Login</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form>
                                                        <Form.Group className="d-flex flex-nowrap align-items-center">
                                                            <Form.Label className="p-0 m-2 w-25">Username</Form.Label>
                                                            <Form.Control className="m-2" type="text" placeholder="Enter your username" />
                                                        </Form.Group>

                                                        <Form.Group className="d-flex flex-nowrap align-items-center">
                                                            <Form.Label className="p-0 m-2 w-25">Password</Form.Label>
                                                            <Form.Control className="m-2" type="password" placeholder="Enter your password" />
                                                        </Form.Group>

                                                        <Form.Control className="mt-3 btn btn-primary" value="Login" onClick={handleLogin} />
                                                    </Form>
                                                </Modal.Body>
                                            </Modal>
                                        </Row>
                                    </div>
                                    <div>
                                        <h3
                                            style={{
                                                fontSize: "18px",
                                                color: "grey",
                                                marginBottom: "3vh",
                                                marginTop: "2vh",
                                            }}
                                        >
                                            <i>{movie["quote"]}</i>
                                        </h3>
                                        <h3 style={{ fontSize: "20px" }}>Overview</h3>
                                        <div>
                                            <p>{movie["plot"]}</p>
                                        </div>
                                        <Container style={{ marginLeft: "-0.7vw" }}>
                                            <Row>
                                                {movie["writer"].map((colaborator, i) => (
                                                    <Col xs={2}>
                                                        <div style={{ fontSize: "14px", marginTop: "2vh" }}>
                                                            {colaborator}
                                                        </div>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </Container>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </div>
    );
}

// Left side of the page minus headline
function Body({ movie }) {
    const [review, setReview] = useState(null);

    useEffect(() => {
        const storedReview = localStorage.getItem("review");
        if (storedReview) {
            setReview(JSON.parse(storedReview));
        }
    }, []);

    if (!review) {
        return (
            <div>
                <div style={{ marginTop: "2%" }}>
                    <h3>Top Actors</h3>
                    <CardDeck.Horizontal cardItems={movie["actors"]} childItem={(actor) => <ActorCard {...actor} />} />
                </div>
                <hr className={styles.hr} />
                <div className='reviewList' style={{ overflowY: "auto", maxHeight: "90vh" }}>
                    <h3>Reviews</h3>
                    {movie["reviews"].map((review, i) => (
                        <ReviewCard
                            author={review["author"]}
                            review={review["review"]}
                            rating={review["rating"]}
                            image={review["profile-image"]}
                        />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div>
            <div style={{ marginTop: "2%" }}>
                <h3>Top Actors</h3>
                <CardDeck.Horizontal cardItems={movie["actors"]} childItem={(actor) => <ActorCard {...actor} />} />
            </div>
            <hr className={styles.hr} />
            <div className='reviewList' style={{ overflowY: "auto", maxHeight: "90vh" }}>
                <ReviewCard
                    author={review["author"]}
                    review={review["review"]}
                    rating={review["rating"]}
                    image={review["profile-image"]}
                />
                {movie["reviews"].map((review, i) => (
                    <ReviewCard
                        author={review["author"]}
                        review={review["review"]}
                        rating={review["rating"]}
                        image={review["profile-image"]}
                    />
                ))}
            </div>
        </div>
    );
}

function ReviewCard({ author, review, rating, image }) {
    return (
        <Card style={{ marginTop: "2vh", marginBottom: "2vh" }}>
            <Card.Header><Image src={image} style={{ width: "2.5vw", height: "5vh", borderRadius: "50%", marginRight: "1vw" }} />  <b style={{ fontSize: "110%" }}>A review by {author} </b></Card.Header>
            <Card.Body>
                <Card.Title>
                    <Chip
                        label={
                            <i className="bi bi-star-fill">
                                <span style={{ marginLeft: "0.5vw" }}>{rating}</span>
                            </i>
                        }
                    />
                </Card.Title>
                <Card.Text>{review}</Card.Text>
            </Card.Body>
        </Card>
    );
}

// Right side of the body minus headline
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

// Modal of the review
function ReviewModal({ movie, loggedIn }) {
    const [show, setShow] = useState(false);

    const [value, setValue] = useState(0);

    const [isReviewed, setReview] = useState(false);

    const handleCloseLoginModal = () => {
        setShow(false);
    };

    const handleClose = () => {
        setShow(false)
        let review = document.getElementById("textarea").value

        localStorage.setItem("review", JSON.stringify({
            "profile-image": "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
            "author": "eu",
            "review": review,
            "rating": value
        }))
        setReview(true)
    };

    const handleShow = () => {
        if (loggedIn) {
            if (!isReviewed)
                setShow(true);
            else {
                localStorage.setItem("review", "")
                setReview(false)
            }
        }
    }

    return (
        <>
            <div
                variant="primary"
                onClick={handleShow}
                style={{ marginTop: "2vh", marginLeft: "-5vw", cursor: "pointer" }}
            >
                {isReviewed ? <i class="bi bi-star-fill"></i> : <i className="bi bi-star"></i>} Review
            </div>
            <Modal show={show} onHide={handleCloseLoginModal}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontFamily: "'Source Sans Pro',Arial,sans-serif" }}>
                        Rate {movie["title"]}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Typography component="legend">Give us your opinion</Typography>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />
                    <p></p>
                    <textarea id="textarea" style={{ width: "100%" }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Review
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


function TrailerModal({ movie }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div onClick={handleShow} style={{ marginTop: "2vh", marginLeft: "-2vw", cursor: "pointer" }}>
                <i className="bi bi-play"></i> Play Trailer
            </div>
            <Modal show={show} onHide={handleClose} size="lg" style={{ display: "flex" }}>
                <Modal.Body>
                    <Player movie={movie} />
                </Modal.Body>
            </Modal>
        </>
    );
}

function Player({ movie }) {
    const YoutubeEmbed = ({ embedId }) => (
        <div className="video-responsive">
            <iframe
                style={{ height: "80vh", width: "100%" }}
                src={`https://www.youtube.com/embed/${embedId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </div>
    );

    YoutubeEmbed.propTypes = {
        embedId: PropTypes.string.isRequired,
    };

    return (
        <div>
            <YoutubeEmbed embedId={movie["trailer"]} />
        </div>
    );
}
