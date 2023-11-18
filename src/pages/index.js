import { Container } from "react-bootstrap";

import CardDeck from "@/components/CardDeck";
import MovieCard from "@/components/MovieCard";
import PageNavbar from "@/components/PageNavbar";

import MOVIES from "@/const/movies.json";

export default function HomePage() {
    return (
        <>
            <PageNavbar />
            <title>MTVDB</title>
            <Container className="my-5">
                <h2>Welcome to the modern movie database!</h2>
                <hr></hr>
                <h3>Trending Movies</h3>
                <CardDeck.Horizontal cardItems={MOVIES} childItem={(movie) => <MovieCard {...movie} />} />

                <br></br>
                <h3>Popular Movies</h3>
                <CardDeck.Horizontal cardItems={MOVIES} childItem={(movie) => <MovieCard {...movie} />} />

                <br></br>
                <h3>Top Movies</h3>
                <CardDeck.Horizontal cardItems={MOVIES} childItem={(movie) => <MovieCard {...movie} />} />
            </Container>
        </>
    );
}

for (let i = MOVIES.length; i < 21; i++) {
    MOVIES.push({
        title: `Movie ${i}`,
        image: "https://via.placeholder.com/200x300",
    });
}
