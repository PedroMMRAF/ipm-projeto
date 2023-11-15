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

    const changeGenres = (e) => {
        if (e.target.value == 'movies') {
            setGenres(MOVIE_GENRES);
        }
        else if (e.target.value == 'tvShows') {
            setGenres(TV_GENRES);
        }
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
                    <select onChange={changeGenres} id="category" style={{ width: '100%', marginBottom: '10px' }}>
                        <option value="movies">Movies</option>
                        <option value="tvShows">TV Shows</option>
                    </select>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="sort">Sort By</label>
                    <select id="sort" style={{ width: '100%', marginBottom: '10px' }}>
                        <option value="mostPopular">Most Popular</option>
                        <option value="highestRated">Top</option>
                        <option value="newest">New</option>
                        <option value="newest">Throwback</option>
                        <option value="newest">Trending</option>
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
                        {genres.map((genre, index) => (
                            <div><input type="checkbox" id={genre} /><label htmlFor={genre}>{genre}</label></div>
                        ))}
                    </div>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input type="text" placeholder="Location" style={{ width: '100%' }} />
                </div>
            </div>
        </Container>
    );
};


