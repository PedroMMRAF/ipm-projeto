import React from 'react';
import MyNavbar from '@/components/Navbar';
import { Container, Form } from 'react-bootstrap';

import MOVIE_GENRES from '@/const/movie-genres.json';
import TV_GENRES from '@/const/tv-genres.json';


export default function FiltersPage() {
    return (
        <div>
            <MyNavbar />
            <SearchFilterBox />
        </div>
    )
}


function SearchFilterBox() {
    let [genreElements, setGenreElements] = React.useState([]);
    let [selectedGenres, setSelectedGenres] = React.useState({});

    const updateGenreElements = (type, updatedGenres = {}) => {
        // Select the correct genre list
        const genres = type === 'tv' ? TV_GENRES : MOVIE_GENRES;

        // Update the selected genres
        const newSelectedGenres = { ...selectedGenres, ...updatedGenres };
        setSelectedGenres(newSelectedGenres);

        // Update the genre elements
        setGenreElements(genres.map((genre) => {
            let checked = newSelectedGenres[genre] || false;
            return <Form.Check key={genre} type="checkbox" label={genre} value={genre} onChange={changeGenre} checked={checked} />
        }));

        return newSelectedGenres;
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
        const genresUrl = params.get('genres') || '';
        const sort = params.get('sort') || '';

        // Set the 'type' parameter
        document.getElementById("category").value = type;
        console.log(type);
        // Set the 'genre' parameter
        const updatedGenres = {};
        for (let genre of genresUrl.split(',')) {
            updatedGenres[genre] = true;
        }

        updateGenreElements(type, updatedGenres);

        // Set the 'sort' parameter
        if (sort) {
            document.getElementById("sort").value = sort;
        }
    }, []);

    const changeType = (e) => {
        updateGenreElements(e.target.value);

        const params = new URLSearchParams(window.location.search);

        params.set('type', e.target.value);

        updateUrl(params);
    }

    const changeSort = (e) => {
        const params = new URLSearchParams(window.location.search);

        params.set('sort', e.target.value);

        updateUrl(params);
    }

    const changeGenre = (e) => {
        const newSelectedGenres = updateGenreElements(
            document.getElementById("category").value,
            { [e.target.value]: e.target.checked }
        );

        console.log(newSelectedGenres);

        const params = new URLSearchParams(window.location.search);

        params.set('genres', Object.entries(newSelectedGenres)
            .filter(([_, isChecked]) => isChecked)
            .map(([genre, _]) => genre)
            .join(','));

        console.log(params.toString());

        updateUrl(params);
    }

    return (
        <Container>
            <div className="d-flex flex-column p-2 border rounded mx-2" style={{ maxWidth: '350px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="category">Category</label>
                    <select onChange={changeType} id="category" style={{ width: '100%', marginBottom: '10px' }}>
                        <option value="movies">Movies</option>
                        <option value="tv">TV Shows</option>
                    </select>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="sort">Sort By</label>
                    <select onChange={changeSort} id="sort" style={{ width: '100%', marginBottom: '10px' }}>
                        <option value="new">Newest</option>
                        <option value="top">Best Rating</option>
                        <option value="throwback">Throwback</option>
                        <option value="popular">Most Popular</option>
                        <option value="trending">Trending</option>
                    </select>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <div style={{ marginBottom: '5px' }}>
                        <label>Release year</label>
                        <input type="text" style={{ width: '100%' }} />
                    </div>
                    <div style={{ marginBottom: '5px' }}>
                        <label>From</label>
                        <input type="text" style={{ width: '45%', marginRight: '10%' }} />
                        <label>To</label>
                        <input type="text" style={{ width: '45%' }} />
                    </div>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <div style={{ fontWeight: 'bold' }}>Genres</div>
                    <Form style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        {genreElements}
                    </Form>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input type="text" placeholder="Location" style={{ width: '100%' }} />
                </div>
                <div>
                    <button style={{ width: '100%', padding: '10px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '4px' }}>Search</button>
                </div>
            </div>
        </Container >
    );
};


