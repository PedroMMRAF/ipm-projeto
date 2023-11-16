import { Container } from "react-bootstrap";

import CardDeck from "@/components/CardDeck";
import PageNavbar from "@/components/PageNavbar";

export default function HomePage() {
    return (
        <>
            <PageNavbar />
            <title>MTVDB</title>
            <Container>
                <h2>Welcome to the modern movie database!</h2>
            </Container>
            <Container>
                <hr></hr>
                <h3>Trending Movies</h3>
                <CardDeck.Horizontal movies={MOVIES} />
                <br></br>
                <h3>Popular Movies</h3>
                <CardDeck.Horizontal movies={MOVIES} />
                <br></br>
                <h3>Top Movies</h3>
                <CardDeck.Horizontal movies={MOVIES} />
            </Container>
        </>
    );
}

let MOVIES = [];

for (let i = 1; i < 21; i++) {
    MOVIES.push({
        key: `movie-${i}`,
        title: `Movie ${i}`,
        image: "https://via.placeholder.com/200x300",
    });
}
