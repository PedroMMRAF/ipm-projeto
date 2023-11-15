import MyNavbar from '@/components/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import React from 'react';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import style from "@/styles/moviePage.module.css"
import MOVIES from "@/const/movies.json"


function Headline() {
    return (
        <div className={style.div} style={{
            backgroundImage: "url('https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg')"
        }}>
            <div className={style.cover} style={{ backgroundImage: "linear-gradient(to bottom right, rgba(31.5, 10.5, 10.5, 1), rgba(31.5, 10.5, 10.5, 0.84))" }}>
                <Container>
                    <div>
                        <Row>
                            <Col xs={4} md={4} className={style.content}>
                                <div >
                                    <Image src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg" style={{ height: "70vh" }} rounded />
                                </div>
                            </Col>
                            <Col xs={8} className={style.content}>
                                <div>
                                    <div>
                                        <h2>OppenHeimer</h2>
                                        <div>
                                            <span className={style.span}>
                                                R
                                            </span>
                                            <span className={style.span}>
                                                2023 US
                                            </span>
                                            <span className={style.span}>
                                                Drama, History
                                            </span>
                                            <span className={style.span}>
                                                3h 1m
                                            </span>
                                        </div>
                                    </div>
                                    <Row>
                                        <Col sm={2}>

                                        </Col>
                                        <Col xs={2}>
                                            <i class="bi bi-play"></i> Play Trailer
                                        </Col>
                                        <Col xs={3}>
                                            <i class="bi bi-bookmark-plus"></i> Add To Watchlist
                                        </Col>
                                        <Col>
                                            <ModalPage />
                                        </Col>
                                    </Row>
                                    <div>
                                        <h3>The world forever changes</h3>
                                        <h3>Overview</h3>
                                        <div>
                                            <p>
                                                The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.
                                            </p>
                                        </div>
                                        <Container>
                                            <Row>
                                                <p>Christopher Nolan</p>
                                                <p>Director, Writer</p>
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

function Body() {
    return (
        <div>
            <div style={{ marginTop: "2%" }}>
                <h3>Top Actors</h3>
                <SimpleSlider />
            </div>
            <hr className={style.hr} />
            <div>
                {MOVIES[0]["reviews"].map((review, i) => (
                    <p>{review["review"]}</p>
                ))}
            </div>
        </div>
    )
}


function Actor() {
    return (
        <Card className={style.card}>
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
        </Card>
    );
}

function Sidebody() {
    return (
        <div>
            <Container>
                <p>
                    <strong>
                        <bdi>Status</bdi>
                    </strong>
                    Released
                </p>
                <p>
                    <strong>
                        <bdi>Original Language</bdi>
                    </strong>
                    English
                </p>
                <p>
                    <strong>
                        <bdi>Budget</bdi>
                    </strong>
                    $100,000,000.00
                </p>
                <p>
                    <strong>
                        <bdi>Revenue</bdi>
                    </strong>
                    $948,900,000.00
                </p>
            </Container>
        </div>
    )
}


function ModalPage() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div variant="primary" onClick={handleShow}>
                <i class="bi bi-star"></i> Review
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


function SimpleSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2
    };
    return (
        <Slider {...settings}>
            <div>
                <h3>1</h3>
            </div>
            <div>
                <h3>2</h3>
            </div>
            <div>
                <h3>3</h3>
            </div>
            <div>
                <h3>4</h3>
            </div>
            <div>
                <h3>5</h3>
            </div>
            <div>
                <h3>6</h3>
            </div>
        </Slider>
    );
}

export default function NearYouPage() {
    return (
        <div>
            <MyNavbar />
            <Headline />
            <Container>
                <Row>
                    <Col md={8}>
                        <Body />
                    </Col>
                    <Col className={style.sidebody}>
                        <Sidebody />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
