import React from 'react';
import MyNavbar from '@/components/Navbar';
import { Container } from 'react-bootstrap';

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
    let [genres, setGenres] = React.useState(MOVIE_GENRES);

    let baseLink = `/filters`;

    // Check the URL when the component mounts
    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const type = params.get('type');
        const genre = params.get('genre');
        const sort = params.get('sort');

        if (type === 'tv') {
            setGenres(TV_GENRES);
            document.getElementById("category").value = 'tvShows';
        }

        if (genre) {
            const urlGenres = genre.split(',').sort();
            let activeGenres = type == 'tv' ? TV_GENRES : MOVIE_GENRES;
            activeGenres.forEach((genre) => {
                const checkbox = document.getElementById(genre);
                if (checkbox) {
                    checkbox.checked = urlGenres.includes(genre);
                    console.log(genre);
                    console.log(urlGenres.includes(genre));
                }
            });
        }

        if (sort) {
            document.getElementById("sort").value = sort;
        }
    }, []);

    const changeType = (e) => {
        let newType = e.target.value;
        if (newType == 'movies') {
            setGenres(MOVIE_GENRES);
        }
        else if (newType == 'tvShows') {
            setGenres(TV_GENRES);
            newType = 'tv';
        }

        // Get the current URL parameters
        const params = new URLSearchParams(window.location.search);

        // Set the 'type' parameter
        params.set('type', newType);
        params.set('genre', '');
        genres.forEach((genre) => {
            const checkbox = document.getElementById(genre);
            if (checkbox) {
                checkbox.checked = false;
            }
        });
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

        // Get the current URL parameters
        const params = new URLSearchParams(window.location.search);

        // Get the current genres
        let genres = params.get('genre') ? params.get('genre').split(',') : [];

        if (isChecked) {
            // Add the genre
            genres.push(genre);
        } else {
            // Remove the genre
            genres = genres.filter(g => g !== genre);
        }

        // Set the 'genres' parameter
        params.set('genre', genres.join(','));

        // Change the URL without reloading the page
        const newUrl = `${baseLink}?${params.toString()}`;
        window.history.pushState(null, '', newUrl);
    }
    return (
        <Container>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '350px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                margin: '10px',
            }}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="category">Category</label>
                    <select onChange={changeType} id="category" style={{ width: '100%', marginBottom: '10px' }}>
                        <option href={`${baseLink}&type=movies`} value="movies">Movies</option>
                        <option href={`${baseLink}&type=tv`} value="tvShows">TV Shows</option>
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        {genres.map((genre) => (
                            <div><input type="checkbox" id={genre} value={genre} onChange={changeGenre} /><label htmlFor={genre}>{genre}</label></div>
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


