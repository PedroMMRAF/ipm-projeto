import React, { useState, useEffect } from "react";
import { Dropdown, Container, Form, Button } from "react-bootstrap";

import MovieCard from "@/components/MovieCard";
import PageNavbar, { SORTING } from "@/components/PageNavbar";

import TV from "@/const/tv-shows.json";
import TV_GENRES from "@/const/tv-genres.json";
import MOVIES from "@/const/movies.json";
import MOVIE_GENRES from "@/const/movie-genres.json";

const ALL = [...MOVIES, ...TV];
const ALL_GENRES = [...new Map([...MOVIE_GENRES, ...TV_GENRES].map((v) => [v, null])).keys()];

function checkMovieGenre(movie, activeGenres) {
    let ignoreGenreCheck = true;

    const movieGenres = movie.genres;

    for (let [genre, isActive] of Object.entries(activeGenres)) {
        if (!isActive) {
            continue;
        }

        ignoreGenreCheck = false;
        if (movieGenres.includes(genre)) {
            return true;
        }
    }

    return ignoreGenreCheck;
}

function checkYear(movie, fromYear, toYear) {
    if (!fromYear && !toYear) return true;
    if (!fromYear) return movie.year <= toYear;
    if (!toYear) return movie.year >= fromYear;
    return movie.year >= fromYear && movie.year <= toYear;
}

function checkSearch(movie, search) {
    if (!search) return true;
    search = search.toLowerCase();

    if (movie.title.toLowerCase().includes(search)) return true;

    for (let actor of movie.actors)
        if (
            actor.name.toLowerCase().includes(search) ||
            actor.name.toLowerCase() === search ||
            actor.character.toLowerCase().includes(search) ||
            actor.character.toLowerCase() === search
        )
            return true;

    for (let writer of movie.writer)
        if (writer.toLowerCase().includes(search) || writer.toLowerCase() === search) return true;

    if (movie.director && (movie.director.toLowerCase().includes(search) || movie.director.toLowerCase() === search))
        return true;

    return false;
}

function checkType(movie, type) {
    if (type === "all") return true;
    return movie.type === type;
}

function checkLocation(movie, location) {
    if (!location) return true;
    location = location.toLowerCase();
    if (movie.country.toLowerCase().includes(location) || movie.country.toLowerCase() === location) return true;
    return false;
}

export default function FiltersPage() {
    const [activeMovies, setActiveMovies] = useState([]);
    const [params, setParams] = useState({
        type: "all",
        sort: "popular",
        genres: {},
        to: "",
        from: "",
        search: "",
        location: "",
    });

    let basePath = "/filters";

    const updateParams = (toChange) => {
        console.log(params);

        const newParams = { ...params, ...toChange };
        setParams(newParams);

        const URLParams = new URLSearchParams(window.location.search);

        for (let [key, value] of Object.entries(toChange)) {
            if (key === "genres") {
                value = Object.entries(value)
                    .filter(([_, v]) => v) // filter for true values only
                    .map(([g, _]) => g) // map from [genre, isActive] to genre
                    .join(","); // join with commas
            }

            if (value) {
                URLParams.set(key, value);
            } else {
                URLParams.delete(key);
            }
        }

        window.history.pushState(null, "", `${basePath}?${URLParams.toString()}`);
    };

    const reloadMovies = (newParams) => {
        if (newParams === undefined) newParams = params;

        setActiveMovies(
            ALL.filter(
                (movie) =>
                    checkType(movie, newParams.type) &&
                    checkMovieGenre(movie, newParams.genres) &&
                    checkYear(movie, parseInt(newParams.from) || undefined, parseInt(newParams.to) || undefined) &&
                    checkSearch(movie, newParams.search) &&
                    checkLocation(movie, newParams.location),
            ),
        );
    };

    useEffect(() => {
        const urlParams = Object.fromEntries(new URLSearchParams(window.location.search));
        if (urlParams.genres) urlParams.genres = Object.fromEntries(urlParams.genres.split(",").map((g) => [g, true]));

        console.log(urlParams);

        const newParams = { ...params, ...urlParams };
        setParams(newParams);
        reloadMovies(newParams);
    }, []);

    return (
        <>
            <title>Search</title>
            <PageNavbar />
            <div style={{ display: "flex" }}>
                <div className="m-2" style={{ flexShrink: 0 }}>
                    <SearchFilterBox params={params} updateParams={updateParams} reloadMovies={reloadMovies} />
                </div>
                <div
                    className="m-2"
                    style={{ flexGrow: 4, display: "flex", flexWrap: "wrap", alignContent: "flex-start" }}
                >
                    {activeMovies.map((movie) => (
                        <div key={movie.title} className="m-3">
                            <MovieCard
                                {...movie}
                                onClick={() => {
                                    window.location.href = `/movie-page?title=${movie.title}`;
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

function SearchFilterBox({ params, updateParams, reloadMovies }) {
    const changeFromYear = (value) => {
        updateParams({ from: value });
    };

    const changeToYear = (value) => {
        updateParams({ to: value });
    };

    const changeLocation = (value) => {
        updateParams({ location: value });
    };

    const changeType = (value) => {
        updateParams({ type: value, genres: {} });
    };

    const changeSort = (value) => {
        updateParams({ sort: value });
    };

    const changeSearch = (value) => {
        updateParams({ search: value });
    };

    const changeGenre = (genre) => {
        updateParams({ genres: { ...params.genres, [genre]: !params.genres[genre] } });
    };

    const numericInputFilter = (event) => {
        if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
            event.preventDefault();
        }
    };

    return (
        <Container className="m-3 ps-0">
            <Form className="p-2 m-0 d-flex flex-column border rounded" style={{ maxWidth: "350px" }}>
                <Form.Label className="mb-1 fw-bold">Search</Form.Label>
                <Form.Control
                    className="mb-3"
                    type="text"
                    value={params.search}
                    onChange={(event) => changeSearch(event.target.value)}
                    placeholder="Search"
                />

                <Form.Label className="fw-bold mb-1">Category</Form.Label>
                <Form.Group className="mb-3">
                    <Dropdown onSelect={changeType}>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{ width: "100%" }}>
                            {
                                {
                                    movies: "Movies",
                                    tv: "TV Shows",
                                    all: "All",
                                }[params.type]
                            }
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="all">All</Dropdown.Item>
                            <Dropdown.Item eventKey="movies">Movies</Dropdown.Item>
                            <Dropdown.Item eventKey="tv">TV Shows</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>

                <Form.Label className="mb-1 fw-bold">Sort By</Form.Label>
                <Form.Group className="mb-3">
                    <Dropdown onSelect={changeSort}>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{ width: "100%" }}>
                            {SORTING[params.sort]}
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{ width: "100%" }}>
                            {Object.entries(SORTING).map(([key, value]) => (
                                <Dropdown.Item key={key} eventKey={key}>
                                    {value}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>

                <Form.Label className="mb-1 fw-bold">Release year</Form.Label>
                <Form.Group className="mb-3 align-items-center d-flex">
                    <Form.Label className="me-2 my-0">From</Form.Label>
                    <Form.Control
                        type="text"
                        maxLength={4}
                        onChange={(event) => changeFromYear(event.target.value)}
                        value={params.from}
                        onKeyDown={numericInputFilter}
                    />

                    <Form.Label className="ms-3 me-2 my-0">To</Form.Label>
                    <Form.Control
                        type="text"
                        maxLength={4}
                        onChange={(event) => changeToYear(event.target.value)}
                        value={params.to}
                        onKeyDown={numericInputFilter}
                    />
                </Form.Group>

                <Form.Label className="mb-1 fw-bold">Genres</Form.Label>
                <Form.Group className="mb-3 d-flex flex-wrap">
                    {{
                        tv: TV_GENRES,
                        movies: MOVIE_GENRES,
                        all: ALL_GENRES,
                    }[params.type].map((genre) => (
                        <Button
                            key={genre}
                            variant={params.genres[genre] ? "primary" : "secondary"}
                            className="m-1 flex-fill"
                            onClick={(event) => {
                                event.preventDefault();
                                changeGenre(genre);
                            }}
                        >
                            {genre}
                        </Button>
                    ))}
                </Form.Group>

                <Form.Label className="mb-1 fw-bold">Country</Form.Label>
                <Form.Control
                    className="mb-3"
                    type="text"
                    value={params.location}
                    onChange={(event) => changeLocation(event.target.value)}
                    placeholder="Country"
                />

                <Form.Control
                    type="button"
                    onClick={() => reloadMovies()}
                    className="btn btn-primary"
                    value="Apply Filters"
                />
            </Form>
        </Container>
    );
}

