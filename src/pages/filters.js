import React, { useState, useEffect } from "react";
import { Dropdown, Container, Form, Button } from "react-bootstrap";

import MovieCard from "@/components/MovieCard";
import PageNavbar from "@/components/PageNavbar";

import TV from "@/const/tv-shows.json";
import TV_GENRES from "@/const/tv-genres.json";
import MOVIES from "@/const/movies.json";
import MOVIE_GENRES from "@/const/movie-genres.json";

const MEDIA = [...MOVIES, ...TV];

function checkMovieGenre(movie, activeGenres) {
    let isAnyGenreActive = false;

    for (let [genre, isActive] of Object.entries(activeGenres)) {
        if (isActive) {
            isAnyGenreActive = true;
            break;
        }
    }

    if (!isAnyGenreActive) {
        return true;
    }

    const movieGenres = movie.genres;
    for (let [genre, isActive] of Object.entries(activeGenres)) {
        if (!isActive) {
            continue;
        }
        if (movieGenres.includes(genre)) {
            return true;
        }
    }

    return false;
}

function checkYear(movie, fromYear, toYear) {
    if (!fromYear && !toYear) return true;
    if (!fromYear) return movie.year <= toYear;
    if (!toYear) return movie.year >= fromYear;
    return movie.year >= fromYear && movie.year <= toYear;
}
function checkSearch(movie, search) {
    if (!search)
        return true;
    if (movie.title.toLowerCase().includes(search.toLowerCase()))
        return true;
    for (let actor of movie.actors) {
        if (actor.name.toLowerCase().includes(search.toLowerCase()) || actor.character.toLowerCase().includes(search.toLowerCase()))
            return true;
    }
    return false;
}
export default function FiltersPage() {
    const [activeMovies, setActiveMovies] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const type = params.get("type") || "movies";
        const urlGenres = params.get("genres") || "";
        const toYear = params.get("to") || "";
        const fromYear = params.get("from") || "";
        const search = params.get("search") || "";
        let activeGenres = {};
        if (urlGenres) {
            for (let genre of urlGenres.split(",")) {
                activeGenres[genre] = true;
            }
        }
        setActiveMovies(
            MEDIA.filter(
                (movie) =>
                    movie.type === type && checkMovieGenre(movie, activeGenres) && checkYear(movie, fromYear, toYear) && checkSearch(movie, search)
            ),
        );
    }, []);

    return (
        <>
            <title>Search</title>
            <PageNavbar />
            <div style={{ display: "flex" }}>
                <div style={{ flexShrink: 0 }}>
                    <SearchFilterBox setActiveMovies={setActiveMovies} />
                </div>
                <div
                    className="mt-2"
                    style={{ flexGrow: 4, display: "flex", flexWrap: "wrap", alignContent: "flex-start" }}
                >
                    {activeMovies.map((movie) => (
                        <div style={{ margin: "1rem" }}>
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

function SearchFilterBox({ setActiveMovies }) {
    const [activeGenres, setActiveGenres] = useState({});
    const [search, setSearch] = useState("");
    const [fromYear, setFromYear] = useState("");
    const [toYear, setToYear] = useState("");
    const [location, setLocation] = useState("");

    let [type, setType] = useState("movies");
    let [sort, setSort] = useState("popular");

    const changeFromYear = (value) => {
        setFromYear(value);
        const params = new URLSearchParams(window.location.search);
        params.set("from", value);
        updateUrl(params);
    };

    const changeToYear = (value) => {
        setToYear(value);
        const params = new URLSearchParams(window.location.search);
        params.set("to", value);
        updateUrl(params);
    };

    const changeLocation = (value) => {
        setLocation(value);
        const params = new URLSearchParams(window.location.search);
        params.set("location", value);
        updateUrl(params);
    };

    const changeType = (value) => {
        setType(value);

        setActiveGenres({});

        const params = new URLSearchParams(window.location.search);

        params.set("type", value);
        params.set("genres", "");

        updateUrl(params);
    };

    const changeSort = (value) => {
        const params = new URLSearchParams(window.location.search);
        setSort(value);
        params.set("sort", value);

        updateUrl(params);
    };
    const changeSearch = (value) => {
        const params = new URLSearchParams(window.location.search);
        setSearch(value);
        params.set("search", value);

        updateUrl(params);
    };
    const changeGenre = (genre) => {
        const params = new URLSearchParams(window.location.search);

        setActiveGenres((prev) => ({
            ...prev,
            [genre]: !prev[genre],
        }));

        if (!activeGenres[genre]) {
            params.set("genres", params.get("genres") ? `${params.get("genres")},${genre}` : genre);
        } else {
            params.set(
                "genres",
                params
                    .get("genres")
                    .split(",")
                    .filter((genrea) => genrea !== genre)
                    .join(","),
            );
        }
        updateUrl(params);
    };

    const applyFilters = ({ activeGenres }, { type }, { fromYear }, { toYear }, { search }) => {
        setActiveMovies(
            MEDIA.filter(
                (movie) =>
                    movie.type === type && checkMovieGenre(movie, activeGenres) && checkYear(movie, fromYear, toYear) && checkSearch(movie, search)
            ),
        );
    };

    let baseLink = "/filters";

    // Change the URL without reloading the page
    const updateUrl = (params) => {
        const newUrl = `${baseLink}?${params.toString()}`;
        window.history.pushState(null, "", newUrl);
    };

    // Update the page with the URL parameters
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const type = params.get("type") || "movies";
        const genres = params.get("genres") || "";
        const sort = params.get("sort") || "popular";
        const from = params.get("from") || "";
        const to = params.get("to") || "";
        const location = params.get("location") || "";
        const search = params.get("search") || "";
        setType(type);

        if (genres) {
            for (let genre of genres.split(",")) {
                setActiveGenres((prev) => ({
                    ...prev,
                    [genre]: !prev[genre],
                }));
            }
        }
        setSort(sort);
        setFromYear(from);
        setToYear(to);
        setLocation(location);
        setSearch(search);
    }, []);

    const numericInputFilter = (event) => {
        if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
            event.preventDefault();
        }
    };

    return (
        <Container className="ms-4 mt-4 ps-0">
            <Form className="p-2 m-0 d-flex flex-column border rounded" style={{ maxWidth: "350px" }}>
                <Form.Label className="mb-1 fw-bold">Search</Form.Label>
                <Form.Control
                    className="mb-3"
                    type="text"
                    value={search}
                    onChange={(event) => changeSearch(event.target.value)}
                    placeholder="Search"
                />
                <Form.Label className="fw-bold mb-1">Category</Form.Label>
                <Form.Group className="mb-3">
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{ width: "100%" }}>
                            {type === "movies" ? "Movies" : "TV Shows"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => changeType("movies")}>Movies</Dropdown.Item>
                            <Dropdown.Item onClick={() => changeType("tv")}>TV Shows</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>

                <Form.Label className="mb-1 fw-bold">Sort By</Form.Label>
                <Form.Group className="mb-3">
                    <Dropdown onSelect={changeSort}>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{ width: "100%" }}>
                            {
                                {
                                    new: "Newest",
                                    top: "Best Rating",
                                    throwback: "Throwback",
                                    popular: "Most Popular",
                                    trending: "Trending",
                                }[sort]
                            }
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{ width: "100%" }}>
                            <Dropdown.Item eventKey="new">Newest</Dropdown.Item>
                            <Dropdown.Item eventKey="top">Best Rating</Dropdown.Item>
                            <Dropdown.Item eventKey="throwback">Throwback</Dropdown.Item>
                            <Dropdown.Item eventKey="popular">Most Popular</Dropdown.Item>
                            <Dropdown.Item eventKey="trending">Trending</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>

                <Form.Label className="mb-1 fw-bold">Release year</Form.Label>
                <Form.Group className="mb-3 align-items-center d-flex">
                    <Form.Label className="me-2 my-0">From</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(event) => changeFromYear(event.target.value)}
                        value={fromYear}
                        onKeyDown={numericInputFilter}
                    />

                    <Form.Label className="ms-3 me-2 my-0">To</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(event) => changeToYear(event.target.value)}
                        value={toYear}
                        onKeyDown={numericInputFilter}
                    />
                </Form.Group>

                <Form.Label className="mb-1 fw-bold">Genres</Form.Label>
                <Form.Group className="mb-3 d-flex flex-wrap">
                    {(type === "tv" ? TV_GENRES : MOVIE_GENRES).map((genre) => (
                        <Button
                            key={genre}
                            variant={activeGenres[genre] ? "primary" : "secondary"}
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

                <Form.Label className="mb-1 fw-bold">Location</Form.Label>
                <Form.Control
                    className="mb-3"
                    type="text"
                    value={location}
                    onChange={(event) => changeLocation(event.target.value)}
                    placeholder="Location"
                />

                <Form.Control
                    type="button"
                    onClick={() => {
                        applyFilters({ activeGenres }, { type }, { fromYear }, { toYear }, { search });
                    }}
                    className="btn btn-primary"
                    value="Search"
                />
            </Form>
        </Container>
    );
}
