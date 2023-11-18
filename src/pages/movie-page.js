import MyNavbar from '@/components/PageNavbar';


import { useState, React, useEffect } from 'react';

import {
    Col,
    Row,
    Image,
    Card,
    Button,
    Modal,
    Container,
} from "react-bootstrap";

import ReactDOM from 'react-dom';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {
    Rating,
    Typography,
    Chip,
} from '@mui/material';

import PropTypes from "prop-types";

import styles from "@/styles/movie-page.module.css"
import MOVIES from "@/const/movies.json"

let rating;

export default function MoviePage() {
    return (
        <div>
            <MyNavbar />
            <Headline />
            <Container>
                <Row>
                    <Col md={9} sm={9}>
                        <Body />
                    </Col>
                    <Col className={styles.sidebody} md={3} sm={3}>
                        <Sidebody />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

// The element containing everything within the movie background image
function Headline() {
    const [review, setReview] = useState(null);

    useEffect(() => {
        const storedReview = localStorage.getItem("review");
        if (storedReview) {
            setReview(JSON.parse(storedReview));
        }
    }, []);

    rating = 0;
    MOVIES[0]["reviews"].map((review, i) => (
        rating += parseInt(review["rating"])
    ))

    if (!review) {
        rating = rating / MOVIES[0]["reviews"].length
    } else {
        rating = (rating + review["rating"]) / (MOVIES[0]["reviews"].length + 1)
    }

    const addToWatchlist = () => {
        let bookmarkList = []
        bookmarkList[0] = MOVIES[0]
        localStorage.setItem("bookmarks", JSON.stringify(bookmarkList))
    }

    return (
        <div className={styles.div} style={{
            backgroundImage: `url(${MOVIES[0]["background-image"]})`
        }}>
            <div className={styles.cover} style={{ backgroundImage: MOVIES[0]["cover"] }}>
                <Container>
                    <div>
                        <Row>
                            <Col xs={4} className={styles.content}>
                                <div >
                                    <Image src={MOVIES[0]["poster"]} style={{ height: "70vh" }} rounded />
                                </div>
                            </Col>
                            <Col xs={8} className={styles.content} style={{ marginTop: "12vh" }}>
                                <div style={{ marginLeft: "1vh" }}>
                                    <div style={{ marginBottom: "3vh" }}>
                                        <h2>{MOVIES[0]["title"]}</h2>
                                        <div>
                                            <span className={styles.span}>
                                                R
                                            </span>
                                            <span className={styles.span}>
                                                2023 US
                                            </span>
                                            <span className={styles.span}>
                                                &#x2022; Drama, History
                                            </span>
                                            <span className={styles.span}>
                                                &#x2022; 3h 1m
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ marginLeft: "-2vw" }}>
                                        <Row>

                                            <Col xs={3}>
                                                <svg style={{ height: "8vh", width: "8vw", color: "yellow" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="ipc-icon ipc-icon--star sc-bde20123-4 frBGmx" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path></svg>
                                                <span style={{ marginLeft: "-1.5vw" }}>
                                                    {rating}/5
                                                </span>
                                            </Col>
                                            <Col xs={3}>
                                                <TrailerModal />
                                            </Col>
                                            <Col xs={3}>
                                                <div style={{ marginTop: "2vh", marginLeft: "-5vw", cursor: "pointer" }} onClick={addToWatchlist}>
                                                    <i className="bi bi-bookmark-plus"></i> Add To Watchlist
                                                </div>
                                            </Col>
                                            <Col xs={3}>
                                                <ReviewModal />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: "18px", color: "grey", marginBottom: "3vh", marginTop: "2vh" }}><i>{MOVIES[0]["quote"]}</i></h3>
                                        <h3 style={{ fontSize: "20px" }}>Overview</h3>
                                        <div>
                                            <p>
                                                {MOVIES[0]["overview"]}
                                            </p>
                                        </div>
                                        <Container style={{ marginLeft: "-0.7vw" }}>
                                            <Row>
                                                {
                                                    MOVIES[0]["colab"].map((colaborator, i) => (
                                                        <div><p><b>Christopher Nolan</b></p>
                                                            <p style={{ marginTop: "-3vh", fontSize: "14px" }}>{colaborator["roles"]}</p></div>
                                                    ))}
                                            </Row>
                                        </Container>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div >
        </div >
    )
}

// Left side of the page minus headline
function Body() {
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
                    <SimpleSlider />
                </div>
                <hr className={styles.hr} />
                <div className='reviewList' style={{ overflowY: "auto", maxHeight: "90vh" }}>
                    {MOVIES[0]["reviews"].map((review, i) => (
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
                <SimpleSlider />
            </div>
            <hr className={styles.hr} />
            <div className='reviewList' style={{ overflowY: "auto", maxHeight: "90vh" }}>
                <ReviewCard
                    author={review["author"]}
                    review={review["review"]}
                    rating={review["rating"]}
                    image={review["profile-image"]}
                />
                {MOVIES[0]["reviews"].map((review, i) => (
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
                <Card.Title><Chip label={<i className="bi bi-star-fill"><span style={{ marginLeft: "0.5vw" }}>{rating}</span></i>} /></Card.Title>
                <Card.Text>
                    {review}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

// Card containing each actor
function Actor({ name, character, image }) {
    return (
        <Card className={styles.card}>
            <Card.Img variant="top" src={image} style={{ height: "25vh" }} />
            <Card.Body>
                <Card.Title className={styles.title}>{name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: "small" }}>{character}</Card.Subtitle>
            </Card.Body>
        </Card>
    );
}

// Right side of the body minus headline
function Sidebody() {
    return (
        <div>
            <Container>
                <div>
                    <div>
                        <strong>
                            <bdi>Status</bdi>
                        </strong>
                        <p>{MOVIES[0]["status"]}</p>
                    </div>
                    <div>
                        <strong>
                            <bdi>Original Language</bdi>
                        </strong>
                        <p>{MOVIES[0]["original-language"]}</p>
                    </div>
                    <div>
                        <strong>
                            <bdi>Budget</bdi>
                        </strong>
                        <p>{MOVIES[0]["budget"]}</p>
                    </div>
                    <div>
                        <strong>
                            <bdi>Revenue</bdi>
                        </strong>
                        <p>{MOVIES[0]["revenue"]}</p>
                    </div>
                </div>
            </Container>
        </div>
    )
}

// Slider arrow settings
function SliderArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${style.arrow}`}
            style={{ background: "black" }}
            onClick={onClick}
        />
    );
}

// Slider with actors
function SimpleSlider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        nextArrow: <SliderArrow />,
        prevArrow: <SliderArrow />
    }

    return (
        <Slider {...settings}>
            {MOVIES[0]["actors"].map((actor, i) => (
                <Actor name={actor["name"]} character={actor["character"]} image={actor["image"]} />
            ))}
        </Slider>
    );
}

// Modal of the review
function ReviewModal() {
    const [show, setShow] = useState(false);

    const [value, setValue] = useState(0);

    const handleClose = () => {
        setShow(false)
        let review = document.getElementById("textarea").value

        localStorage.setItem("review", JSON.stringify({
            "profile-image": "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
            "author": "eu",
            "review": review,
            "rating": value
        }))
    };
    const handleShow = () => setShow(true);


    return (
        <>
            <div variant="primary" onClick={handleShow} style={{ marginTop: "2vh", marginLeft: "-5vw", cursor: "pointer" }}>
                <i className="bi bi-star"></i> Review
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontFamily: "'Source Sans Pro',Arial,sans-serif" }}>Rate {MOVIES[0]["title"]}</Modal.Title>
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
                    <textarea id='textarea' style={{ width: "100%" }} />
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

function TrailerModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div onClick={handleShow} style={{ marginTop: "2vh", marginLeft: "-2vw", cursor: "pointer" }}>
                <i className="bi bi-play"></i> Play Trailer
            </div>
            <Modal show={show} onHide={handleClose} size='lg' style={{ display: "flex" }}>
                <Modal.Body>
                    <Player />
                </Modal.Body>
            </Modal>
        </>
    );
}

function Player() {

    const YoutubeEmbed = ({ embedId }) => (
        <div className="video-responsive">
            <iframe style={{ height: "80vh", width: "100%" }}
                src={`https://www.youtube.com/embed/${embedId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </div>
    );

    YoutubeEmbed.propTypes = {
        embedId: PropTypes.string.isRequired
    };

    return (
        <div>
            <YoutubeEmbed embedId={MOVIES[0]["trailer"]} />
        </div>
    );
}


