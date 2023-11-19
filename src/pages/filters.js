import React from "react";
import { Dropdown, Container, Form, Button } from "react-bootstrap";

import PageNavbar from "@/components/PageNavbar";
import MOVIES from "@/const/movies.json";
import MovieCard from "@/components/MovieCard";

import TV_GENRES from "@/const/tv-genres.json";
import MOVIE_GENRES from "@/const/movie-genres.json";

function checkMovieGenre(movie, urlGenres) {
    if (!urlGenres) {
        return true;
    }
    const movieGenres = movie.genres;
    for (let genre of urlGenres.split(",")) {
        if (movieGenres.includes(genre)) {
            return true;
        }
    }
    return false;
}
export default function FiltersPage() {
    const [activeMovies, setActiveMovies] = React.useState(MOVIES);
    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const type = params.get("type") || "movies";
        const urlGenres = params.get("genres") || "";
        setActiveMovies(MOVIES.filter((movie) => movie.type === type && checkMovieGenre(movie, urlGenres)));
    }, []);
    return (
        <>
            <title>Search</title>
            <PageNavbar />
            <div style={{ display: 'flex', minWidth: '0' }}>
                <SearchFilterBox activeMovies={activeMovies} setActiveMovies={setActiveMovies} style={{ flexGrow: 0, flexShrink: 0 }} />
                <div style={{
                    flexGrow: 1,
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    marginLeft: 'calc(-45% + 1rem)'
                }}>
                    {activeMovies.map((movie) => (
                        <div style={{ width: 'calc(17% - 1rem)', margin: '0.2rem' }}>
                            <MovieCard {...movie} onClick={() => {
                                window.location.href = "/movie-page";
                            }} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}



function SearchFilterBox({ activeMovies, setActiveMovies }) {
    const [activeGenres, setActiveGenres] = React.useState({});

    const [fromYear, setFromYear] = React.useState("");
    const [toYear, setToYear] = React.useState("");
    const [location, setLocation] = React.useState("");

    let [type, setType] = React.useState("movies");
    let [sort, setSort] = React.useState("popular");

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
    const changeMovies = (movies) => {
        setActiveMovies(movies);
    }
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

    let baseLink = "/filters";

    // Change the URL without reloading the page
    const updateUrl = (params) => {
        const newUrl = `${baseLink}?${params.toString()}`;
        window.history.pushState(null, "", newUrl);
    };

    // Update the page with the URL parameters
    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const type = params.get("type") || "movies";
        const genres = params.get("genres") || "";
        const sort = params.get("sort") || "popular";
        const from = params.get("from") || "";
        const to = params.get("to") || "";
        const location = params.get("location") || "";

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
    }, []);

    const numericInputFilter = (event) => {
        if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
            event.preventDefault();
        }
    };

    return (
        <Container style={{ marginTop: "10px", marginLeft: "20px" }}>
            {
                <Form className="d-flex flex-column p-2 border rounded mx-2" style={{ maxWidth: "350px" }}>
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
                                {sort === "new"
                                    ? "Newest"
                                    : sort === "top"
                                        ? "Best Rating"
                                        : sort === "throwback"
                                            ? "Throwback"
                                            : sort === "popular"
                                                ? "Most Popular"
                                                : "Trending"}
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
                        onClick={() => { window.location.reload(); }}
                        className="btn btn-primary"
                        value="Search"
                    />
                </Form>
            }
        </Container>
    );
}
