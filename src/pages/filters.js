import React from 'react';
import MyNavbar from '@/components/Navbar';
import { Container, Form } from 'react-bootstrap';
import MOVIE_GENRES from '@/const/movie-genres.json';
import TV_GENRES from '@/const/tv-genres.json';
import { Dropdown } from 'react-bootstrap';

export default function FiltersPage() {
    return (
        <div>
            <MyNavbar />
            <SearchFilterBox />
        </div>
    )
}


function SearchFilterBox() {

    let checkboxesStates = {};
    for (let genre of [...MOVIE_GENRES, ...TV_GENRES]) {
        checkboxesStates[genre] = React.useState(false);
    }
    const [fromYear, setFromYear] = React.useState('');
    const [toYear, setToYear] = React.useState('');
    const [location, setLocation] = React.useState('');
    let [type, setType] = React.useState('movies');
    let [sort, setSort] = React.useState('popular');

    const changeFromYear = (value) => {
        setFromYear(value);
        const params = new URLSearchParams(window.location.search);
        params.set('from', value);
        updateUrl(params);
    }

    const changeToYear = (value) => {
        setToYear(value);
        const params = new URLSearchParams(window.location.search);
        params.set('to', value);
        updateUrl(params);
    }
    const changeLocation = (value) => {
        setLocation(value);
        const params = new URLSearchParams(window.location.search);
        params.set('location', value);
        updateUrl(params);
    }
    const changeType = (value) => {
        setType(value);

        for (let genre of [...MOVIE_GENRES, ...TV_GENRES]) {
            checkboxesStates[genre][1](false);
        }

        const params = new URLSearchParams(window.location.search);

        params.set('type', value);
        params.set('genres', '');

        updateUrl(params);
    }

    const changeSort = (value) => {
        const params = new URLSearchParams(window.location.search);
        setSort(value);
        params.set('sort', value);

        updateUrl(params);
    }

    const changeGenre = (e) => {
        const params = new URLSearchParams(window.location.search);

        checkboxesStates[e.target.value][1](e.target.checked);

        if (e.target.checked) {
            params.set('genres', params.get('genres') ? `${params.get('genres')},${e.target.value}` : e.target.value);
        } else {
            params.set('genres', params.get('genres').split(",").filter((genre) => genre !== e.target.value).join(","));
        }
        updateUrl(params);
    }

    let baseLink = '/filters';

    // Change the URL without reloading the page
    const updateUrl = (params) => {
        const newUrl = `${baseLink}?${params.toString()}`;
        window.history.pushState(null, '', newUrl);
    }

    // Update the page with the URL parameters
    React.useEffect(() => {
        // Get the current URL parameters
        const params = new URLSearchParams(window.location.search);
        const type = params.get('type') || 'movies';
        const genres = params.get('genres') || '';
        const sort = params.get('sort') || 'popular';
        const from = params.get('from') || '';
        const to = params.get('to') || '';
        const location = params.get('location') || '';
        // Set the 'type' parameter
        setType(type);

        // Set the 'genre' parameter
        if (genres) {
            for (let genre of genres.split(',')) {
                checkboxesStates[genre][1](true);
            }
        }
        // Set the 'sort' parameter
        setSort(sort);
        // Set the 'from' parameter
        setFromYear(from);
        // Set the 'to' parameter
        setToYear(to);
        // Set the 'location' parameter
        setLocation(location);
    }, []);

    return (
        <Container style={{ marginLeft: "20px" }}>
            {<Form className="d-flex flex-column p-2 border rounded mx-2" style={{ maxWidth: '350px' }}>
                <Form.Label style={{ fontWeight: 'bold' }} htmlFor="category">Category</Form.Label>
                <Form.Group style={{ marginBottom: '10px' }}>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            {type === 'movies' ? 'Movies' : 'TV Shows'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => changeType('movies')}>Movies</Dropdown.Item>
                            <Dropdown.Item onClick={() => changeType('tv')}>TV Shows</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
                <label htmlFor="sort" style={{ fontWeight: 'bold' }}>Sort By</label>
                <Form.Group style={{ marginBottom: '10px' }}>
                    <Dropdown onSelect={changeSort}>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{ width: '100%' }}>
                            {sort === 'new' ? 'Newest' : sort === 'top' ? 'Best Rating' : sort === 'throwback' ? 'Throwback' : sort === 'popular' ? 'Most Popular' : 'Trending'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{ width: '100%' }}>
                            <Dropdown.Item eventKey="new">Newest</Dropdown.Item>
                            <Dropdown.Item eventKey="top">Best Rating</Dropdown.Item>
                            <Dropdown.Item eventKey="throwback">Throwback</Dropdown.Item>
                            <Dropdown.Item eventKey="popular">Most Popular</Dropdown.Item>
                            <Dropdown.Item eventKey="trending">Trending</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>

                <Form.Label style={{ fontWeight: 'bold', marginTop: '10px' }}>Release year</Form.Label>
                <Form.Group style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Form.Label style={{ marginRight: '10px' }}>From</Form.Label>
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
                        style={{ width: '45%', marginRight: '10%' }}
                    />
                    <Form.Label style={{ marginRight: '10px' }}>To</Form.Label>
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
                        style={{ width: '45%', marginRight: '10%' }}
                    />
                </Form.Group>

                <Form.Label style={{ fontWeight: 'bold', marginTop: '10px' }}>Genres</Form.Label>
                <Form.Group style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    {(type === 'tv' ? TV_GENRES : MOVIE_GENRES).map((genre) => {
                        return <Form.Check key={genre} label={genre} value={genre} onChange={changeGenre} checked={checkboxesStates[genre][0]} />
                    })}
                </Form.Group>

                <Form.Label style={{ fontWeight: 'bold', marginTop: '10px' }}>Location</Form.Label>
                <Form.Control type="text" value={location} onChange={(event) => changeLocation(event.target.value)} placeholder="Location" style={{ width: '100%' }} />

                <Form.Control style={{ fontWeight: 'bold', marginTop: '10px' }} type="button" value='Search' />
            </Form>}
        </Container >
    );
};


