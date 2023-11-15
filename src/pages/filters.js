import React from 'react';
import MyNavbar from '@/components/Navbar';
import { Container, Form } from 'react-bootstrap';

import MOVIE_GENRES from '@/const/movie_genres.json';
import TV_GENRES from '@/const/tv_genres.json';


export default function FiltersPage() {
    return (
        <div>
            <MyNavbar />
            <SearchFilterBox />
        </div>

    )
}

function SearchFilterBox() {
    let [genres, setGenres] = React.useState([]);
    let [selectedGenres, setSelectedGenres] = React.useState({});

    let baseLink = `/filters`;

    // Check the URL when the component mounts
    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const type = params.get('type');
        const genre = params.get('genre');
        const sort = params.get('sort');

        const activeGenres = type == 'tv' ? TV_GENRES : MOVIE_GENRES;
        setGenres(activeGenres);

        document.getElementById("category").value = type;

        if (genre) {
            const urlGenres = genre.split(',');

            document.getElementById("genreArray").childNodes.forEach((genreNode) => {
                let checkbox = genreNode.getElementsByTagName('input')[0];
                checkbox.checked = urlGenres.includes(genre);
                console.log(genre);
                console.log(urlGenres.includes(genre)); z
            });
        }

        if (sort) {
            document.getElementById("sort").value = sort;
        }
    }, []);

    const changeType = (e) => {
        setGenres(e.target.value === 'tv' ? TV_GENRES : MOVIE_GENRES);

        // Get the current URL parameters
        const params = new URLSearchParams(window.location.search);
        params.set('type', e.target.value);

        // Change the URL without reloading the page
        const newUrl = `${baseLink}?${params.toString()}`;
        window.history.pushState(null, '', newUrl);
    }

    const changeSort = (e) => {
        const newSort = e.target.value;

        // Get the current URL parameters
        const params = new URLSearchParams(window.location.search);

        // Set the 'sort' parameter
        params.set('sort', newSort);

        // Change the URL without reloading the page
        const newUrl = `${baseLink}?${params.toString()}`;
        window.history.pushState(null, '', newUrl);
    }

    const changeGenre = (e) => {
        const genre = e.target.value;
        const isChecked = e.target.checked;

        const newGenres = { ...selectedGenres, [genre]: isChecked }
        setSelectedGenres(newGenres);

        // Get the current URL parameters
        const params = new URLSearchParams(window.location.search);

        // Get the current genres
        let genres = Object.entries(newGenres)
            .filter(([_, isChecked]) => isChecked)
            .map(([genre, _]) => genre)
            .join(',');

        // Set the 'genres' parameter
        params.set('genre', genres);

        // Change the URL without reloading the page
        const newUrl = `${baseLink}?${params.toString()}`;
        window.history.pushState(null, '', newUrl);
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
                    <div id="genreArray" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        {genres.map((genre) => (
                            <div><input key={genre} type="checkbox" value={genre} onChange={changeGenre} /><label htmlFor={genre}>{genre}</label></div>
                        ))}
                    </div>
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


