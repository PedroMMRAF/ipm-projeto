import MovieCard from "@/components/MovieCard";
import React, { useState, useEffect } from "react";
import PageNavbar from "@/components/PageNavbar";
import MOVIES from "@/const/movies.json";
import SHOWS from "@/const/tv-shows.json";
import { Container } from "react-bootstrap";


export default function MoviePage() {
    const [isBookmarked, setIsBookmarked] = useState(null);
    const [Bookmarks, setBookmark] = useState(null);

    useEffect(() => {
        const bookmarkList = JSON.parse(localStorage.getItem("bookmarks") || "{}");
        setIsBookmarked(bookmarkList != undefined);
        let list = Object.keys(bookmarkList).filter(key => bookmarkList[key] === true);

        // Filter the movies based on the bookmarks
        let bookmarkedMovies = MOVIES.filter(movie => list.includes(movie.title));
        let bookmarkedShows = SHOWS.filter(show => list.includes(show.title));

        let combinedList = [...bookmarkedMovies, ...bookmarkedShows];
        setBookmark(combinedList);
    }, []);

    return (
        <div>
            <PageNavbar />
            {!isBookmarked ? (
                <></>
            ) : (
                <Container>
                    <h3 className="text-center mt-4">Watchlist</h3>
                    <div
                        className="mt-4"
                        style={{ flexGrow: 4, display: "flex", flexWrap: "wrap", alignContent: "flex-start" }}
                    >
                        {Bookmarks.map((movie, i) => (
                            <div key={i} style={{ margin: "1rem" }}>
                                <MovieCard
                                    {...movie}
                                    onClick={() => {
                                        window.location.href = `/movie-page?title=${movie.title}`;
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </Container>
            )}
        </div>
    );

}