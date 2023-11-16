import MovieCard from "@/components/MovieCard";

import styles from "./CardDeck.module.css";

const CardDeck = {
    Horizontal: ({ onMovieClick, movies }) => {
        return (
            <div className="container-fluid py-2">
                <div
                    className={
                        "d-flex flex-row overflow-auto " +
                        styles.cardDeckHorizontal
                    }
                >
                    {movies.map((movie, index) => (
                        <MovieCard
                            key={index}
                            {...movie}
                            onClick={() => onMovieClick(movie)}
                        />
                    ))}
                </div>
            </div>
        );
    },
    Vertical: ({ onMovieClick, movies }) => {
        return (
            <div className="container-fluid px-2">
                <div
                    className={
                        "align-items-center d-flex flex-column overflow-auto " +
                        styles.cardDeckVertical
                    }
                >
                    {movies.map((movie, index) => (
                        <MovieCard
                            key={index}
                            {...movie}
                            onClick={() => onMovieClick(movie)}
                            className="mb-3"
                        />
                    ))}
                </div>
            </div>
        );
    },
};

export default CardDeck;
