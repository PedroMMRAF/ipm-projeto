import MovieCard from "@/components/MovieCard";

import styles from "./CardDeck.module.css";


const CardDeck = {
    Horizontal: ({ movies }) => {
        return (
            <div className="container-fluid py-2">
                <div
                    className={
                        "d-flex flex-row flex-nowrap overflow-auto " +
                        styles.cardDeckHorizontal
                    }
                >
                    {movies.map((movie) => (
                        <MovieCard {...movie} />
                    ))}
                </div>
            </div>
        );
    },
    Vertical: () => {

    }
}

export default CardDeck;