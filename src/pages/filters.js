import React from "react";
import { Container, Form } from "react-bootstrap";
import MOVIE_GENRES from "@/const/movie-genres.json";
import TV_GENRES from "@/const/tv-genres.json";
import { Dropdown } from "react-bootstrap";
import PageNavbar from "@/components/PageNavbar";

export default function FiltersPage() {
    return (
        <>
            <title>Search</title>
            <PageNavbar />
            <SearchFilterBox />
        </>
    );
}

function SearchFilterBox() {
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

    const changeGenre = (genre) => {
        const params = new URLSearchParams(window.location.search);


        setActiveGenres(prev => ({
            ...prev,
            [genre]: !prev[genre]
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
                setActiveGenres(prev => ({
                    ...prev,
                    [genre]: !prev[genre]
                }));
            }
        }
        setSort(sort);
        setFromYear(from);
        setToYear(to);
        setLocation(location);
    }, []);

    return (
        <Container style={{ marginTop: "10px", marginLeft: "20px" }}>
            {
                <Form className="d-flex flex-column p-2 border rounded mx-2" style={{ maxWidth: "350px" }}>
                    <Form.Label style={{ fontWeight: "bold" }} htmlFor="category">
                        Category
                    </Form.Label>
                    <Form.Group style={{ marginBottom: "10px" }}>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                {type === "movies" ? "Movies" : "TV Shows"}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => changeType("movies")}>Movies</Dropdown.Item>
                                <Dropdown.Item onClick={() => changeType("tv")}>TV Shows</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                    <label htmlFor="sort" style={{ fontWeight: "bold" }}>
                        Sort By
                    </label>
                    <Form.Group style={{ marginBottom: "10px" }}>
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

                    <Form.Label style={{ fontWeight: "bold", marginTop: "10px" }}>Release year</Form.Label>
                    <Form.Group
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Form.Label style={{ marginRight: "10px" }}>From</Form.Label>
                        <Form.Control
                            type="text"
                            maxLength="4"
                            onChange={(event) => changeFromYear(event.target.value)}
                            value={fromYear}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            style={{ width: "45%", marginRight: "10%" }}
                        />
                        <hr />

                        <Form.Label style={{ marginRight: "10px" }}>To</Form.Label>
                        <Form.Control
                            type="text"
                            maxLength="4"
                            onChange={(event) => changeToYear(event.target.value)}
                            value={toYear}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            style={{ width: "45%", marginRight: "10%" }}
                        />
                    </Form.Group>
                    <hr />

                    <Form.Label style={{ fontWeight: "bold", marginTop: "10px" }}>Genres</Form.Label>
                    <Form.Group
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                        }}
                    >
                        <div className="d-flex flex-wrap">
                            {(type === "tv" ? TV_GENRES : MOVIE_GENRES).map(genre => (
                                <button
                                    key={genre}
                                    className={`btn ${activeGenres[genre] ? 'btn-primary' : 'btn-secondary'} m-2`}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        changeGenre(genre);
                                    }}
                                >
                                    {genre}
                                </button>
                            ))}
                        </div>
                    </Form.Group>
                    <hr />

                    <Form.Label style={{ fontWeight: "bold", marginTop: "10px" }}>Location</Form.Label>
                    <Form.Control
                        type="text"
                        value={location}
                        onChange={(event) => changeLocation(event.target.value)}
                        placeholder="Location"
                        style={{ width: "100%" }}
                    />

                    <Form.Control style={{ fontWeight: "bold", marginTop: "10px" }} type="button" value="Search" />
                </Form>
            }
        </Container>
    );
}
