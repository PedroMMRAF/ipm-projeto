import React from 'react'
import MyNavbar from '@/components/Navbar'
import { Container, Form } from 'react-bootstrap'

import MOVIE_GENRES from '@/const/movie-genres.json'
import TV_GENRES from '@/const/tv-genres.json'

export default function FiltersPage() {
    return (
        <div>
            <MyNavbar />
            <SearchFilterBox />
        </div>
    )
}

function SearchFilterBox() {
    let [genreList, setGenreList] = React.useState(MOVIE_GENRES)

    let checkboxesStates = {}
    for (let genre of [...MOVIE_GENRES, ...TV_GENRES]) {
        checkboxesStates[genre] = React.useState(false)
    }

    let [type, setType] = React.useState('movies')

    const changeType = (e) => {
        setType(e.target.value)

        for (let genre of [...MOVIE_GENRES, ...TV_GENRES]) {
            checkboxesStates[genre][1](false)
        }

        const params = new URLSearchParams(window.location.search)

        params.set('type', e.target.value)
        params.set('genres', '')

        updateUrl(params)
    }

    const changeSort = (e) => {
        const params = new URLSearchParams(window.location.search)

        params.set('sort', e.target.value)

        updateUrl(params)
    }

    const changeGenre = (e) => {
        const params = new URLSearchParams(window.location.search)

        checkboxesStates[e.target.value][1](e.target.checked)

        if (e.target.checked) {
            params.set(
                'genres',
                params.get('genres')
                    ? `${params.get('genres')},${e.target.value}`
                    : e.target.value,
            )
        } else {
            params.set(
                'genres',
                params
                    .get('genres')
                    .split(',')
                    .filter((genre) => genre !== e.target.value)
                    .join(','),
            )
        }

        updateUrl(params)
    }

    let baseLink = '/filters'

    // Change the URL without reloading the page
    const updateUrl = (params) => {
        const newUrl = `${baseLink}?${params.toString()}`
        window.history.pushState(null, '', newUrl)
    }

    // Update the page with the URL parameters
    React.useEffect(() => {
        // Get the current URL parameters
        const params = new URLSearchParams(window.location.search)
        const type = params.get('type') || 'movies'
        const genres = params.get('genres') || ''
        const sort = params.get('sort') || 'popular'

        // Set the 'type' parameter
        setType(type)

        // Set the 'genre' parameter
        if (genres) {
            for (let genre of genres.split(',')) {
                checkboxesStates[genre][1](true)
            }
        }

        // Set the 'sort' parameter
        if (sort) {
            document.getElementById('sort').value = sort
        }
    }, [])

    return (
        <Container>
            <Form
                className='d-flex flex-column p-2 border rounded mx-2'
                style={{ maxWidth: '350px' }}
            >
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor='category'>Category</label>
                    <select
                        onChange={changeType}
                        value={type}
                        id='category'
                        style={{ width: '100%', marginBottom: '10px' }}
                    >
                        <option value='movies'>Movies</option>
                        <option value='tv'>TV Shows</option>
                    </select>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor='sort'>Sort By</label>
                    <select
                        onChange={changeSort}
                        id='sort'
                        style={{ width: '100%', marginBottom: '10px' }}
                    >
                        <option value='new'>Newest</option>
                        <option value='top'>Best Rating</option>
                        <option value='throwback'>Throwback</option>
                        <option value='popular'>Most Popular</option>
                        <option value='trending'>Trending</option>
                    </select>
                </div>

                <Form.Label style={{ fontWeight: 'bold', marginTop: '10px' }}>
                    Release year
                </Form.Label>
                <Form.Group
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Form.Label>From</Form.Label>
                    <Form.Control
                        type='text'
                        style={{ width: '45%', marginRight: '10%' }}
                    />
                    <Form.Label>To</Form.Label>
                    <Form.Control type='text' style={{ width: '45%' }} />
                </Form.Group>

                <Form.Label style={{ fontWeight: 'bold', marginTop: '10px' }}>
                    Genres
                </Form.Label>
                <Form.Group
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                    }}
                >
                    {(type === 'tv' ? TV_GENRES : MOVIE_GENRES).map((genre) => {
                        return (
                            <Form.Check
                                key={genre}
                                label={genre}
                                value={genre}
                                onChange={changeGenre}
                                checked={checkboxesStates[genre][0]}
                            />
                        )
                    })}
                </Form.Group>

                <Form.Label style={{ fontWeight: 'bold', marginTop: '10px' }}>
                    Location
                </Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Location'
                    style={{ width: '100%' }}
                />
                <Form.Control
                    style={{ fontWeight: 'bold', marginTop: '10px' }}
                    type='button'
                    value='Search'
                />
            </Form>
        </Container>
    )
}
