import MyNavbar from '@/components/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import React from 'react';
import 'react-multi-carousel/lib/styles.css';
import Card from 'react-bootstrap/Card';
import MOVIES from "@/const/movies.json"


function Headline() {
    return (
        <div className='header' style={{
            backgroundImage: "url('https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg')"
        }}>
            <div className='cover' style={{ backgroundImage: "linear-gradient(to bottom right, rgba(31.5, 10.5, 10.5, 1), rgba(31.5, 10.5, 10.5, 0.84))" }}>
                <Container>
                    <div>
                        <Row>
                            <Col xs={4} md={4} className='content'>
                                <div >
                                    <Image src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg" style={{ height: "70vh" }} rounded />
                                </div>
                            </Col>
                            <Col xs={8} className='content'>
                                <div>
                                    <div>
                                        <h2>OppenHeimer</h2>
                                        <div>
                                            <span>
                                                R
                                            </span>
                                            <span>
                                                2023 US
                                            </span>
                                            <span>
                                                Drama, History
                                            </span>
                                            <span>
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
                                            <i class="bi bi-star"></i> Review
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
            </div>
        </div >
    )
}

function Body() {
    return (
        <div>
            <div style={{ marginTop: "2%" }}>
                <h3>Top Actors</h3>
                <div class="carousel">
                    <Row>
                        <Col xs={2} className='carousel-col'>
                            <Actor />
                        </Col >
                        <Col xs={2} className='carousel-col'>
                            <Actor />
                        </Col>
                        <Col xs={2} className='carousel-col'>
                            <Actor />
                        </Col>
                        <Col xs={2} className='carousel-col'>
                            <Actor />
                        </Col>
                        <Col xs={2} className='carousel-col'>
                            <Actor />
                        </Col>
                        <Col xs={2} className='carousel-col'>
                            <Actor />
                        </Col>
                        <Col xs={2} className='carousel-col'>
                            <Actor />
                        </Col>
                    </Row>
                </div>
            </div>
            <hr />
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
        <Card className='card'>
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
                    <Col className='sidebody'>
                        <Sidebody />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
