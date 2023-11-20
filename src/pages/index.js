import { Container } from "react-bootstrap";

import CardDeck from "@/components/CardDeck";
import MovieCard from "@/components/MovieCard";
import PageNavbar from "@/components/PageNavbar";

import MOVIES from "@/const/movies.json";

import styles from "@/styles/index.module.css";

export default function HomePage() {
    return (
        <>
            <PageNavbar />
            <title>MTVDB</title>
            <div
                className={styles.banner}
                onClick={() => {
                    window.location.href = "/near-you";
                }}
            >
                <div className={styles.titles}>
                    <h1>MTVDB</h1>
                    <h3>The Movie and TV Database</h3>
                    <h5>
                        <a href="/near-you">Check movies near you!</a>
                    </h5>
                </div>
                <img src="/light_map.svg" />
            </div>
            <Container className="my-5">
                <hr></hr>
                <h3>Trending Movies</h3>
                <CardDeck.Horizontal
                    cardItems={MOVIES}
                    childItem={(movie) => (
                        <MovieCard
                            {...movie}
                            onClick={() => {
                                window.location.href = `/movie-page?title=${movie.title}`;
                            }}
                        />
                    )}
                />

                <br></br>
                <h3>Popular Movies</h3>
                <CardDeck.Horizontal
                    cardItems={MOVIES}
                    childItem={(movie) => (
                        <MovieCard
                            {...movie}
                            onClick={() => {
                                window.location.href = `/movie-page?title=${movie.title}`;
                            }}
                        />
                    )}
                />

                <br></br>
                <h3>Top Movies</h3>
                <CardDeck.Horizontal
                    cardItems={MOVIES}
                    childItem={(movie) => (
                        <MovieCard
                            {...movie}
                            onClick={() => {
                                window.location.href = `/movie-page?title=${movie.title}`;
                            }}
                        />
                    )}
                />
            </Container>
        </>
    );
}

for (let i = MOVIES.length; i < 21; i++) {
    MOVIES.push({
        title: `Movie ${i}`,
        poster: "https://via.placeholder.com/200x300",
    });
}
