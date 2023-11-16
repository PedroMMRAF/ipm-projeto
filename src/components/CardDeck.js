import MovieCard from "@/components/MovieCard";

import styles from "./CardDeck.module.css";

const CardDeck = {
    Horizontal: ({ onMovieClick, movies }) => {
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
    Vertical: ({ onMovieClick, movies }) => {
        return (
            <div className="container-fluid px-2">
                <div
                    className={"d-flex flex-column " + styles.cardDeckVertical}
                >
                    {movies.map((movie) => (
                        <MovieCard
                            {...movie}
                            onClick={() => onMovieClick(movie)}
                        />
                    ))}
                </div>
            </div>
        );
    },
};

export default CardDeck;
