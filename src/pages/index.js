import { Container } from "react-bootstrap";

import MyNavbar from "@/components/Navbar";
import CardDeck from "@/components/CardDeck";

let MOVIES = [];

for (let i = 1; i < 21; i++) {
    MOVIES.push({
        key: `movie-${i}`,
        title: `Movie ${i}`,
        image: "https://via.placeholder.com/200x300",
    });
}

export default function HomePage() {
    return (
        <div>
            <MyNavbar />
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
        </div>
    );
}
