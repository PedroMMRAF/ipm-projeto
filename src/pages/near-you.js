import MyNavbar from '@/components/Navbar';
import GoogleMapComponent from '@/components/GoogleMapComponent';
import CustomMarker from '@/components/CustomMarker';
import { InfoWindow } from '@react-google-maps/api';
import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import styles from '@/styles/map.module.css';

let MOVIES = [];

const center = [38.66004943847656, -9.203119277954102];
const marker1 = [38.673900, -9.166215];
const marker2 = [38.728175, -9.140576];
const marker3 = [38.703505, -9.351862];
const marker4 = [38.735913, -9.264491];
let Movies=[[38.673900, -9.166215],[38.728175, -9.140576],[38.703505, -9.351862],[38.735913, -9.264491]]

// ... (other imports)

export default function NearYouPage() {
  const [infoWindow, setInfoWindow] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const locationPopUp = (markerPosition) => {
    setInfoWindow({
      position: { lat: markerPosition[0], lng: markerPosition[1] },
      content: 'You are Here!',
    });
  };

  const MoviePopUp = (movie,markerPosition) => {
    setInfoWindow({
      position: { lat: markerPosition[0], lng: markerPosition[1] },
      content: movie.title +' Was Filmed Here!',
    });
  };

  const closeInfoWindow = () => {
    setInfoWindow(null);
  };

  const selectMovie = (movie) => {
    setSelectedMovie(movie);
    MoviePopUp(movie,Movies[movie.key])
    
  };
  const selectMovieFromPin= (movie,position) =>{
    setSelectedMovie(movie);
   
  }

  const closeMovie = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <h2>Movies near You</h2>
      <MyNavbar />
      <Container fluid>
        <Row>
          <div className="col-3">
            <CardDeck onMovieClick={selectMovie} />
          </div>
        
          <div className={styles.map}>
            <GoogleMapComponent center={center}>
              <CustomMarker onClick={() => locationPopUp(center)} color="red" position={center} />
              <CustomMarker onClick={() => selectMovieFromPin(MOVIES[0],marker1)} color="blue" position={marker1} />
              <CustomMarker onClick={() => selectMovieFromPin(MOVIES[1],marker2)} color="blue" position={marker2} />
              <CustomMarker onClick={() => selectMovieFromPin(MOVIES[2],marker3)} color="blue" position={marker3} />
              <CustomMarker onClick={() => selectMovieFromPin(MOVIES[3],marker4)} color="blue" position={marker4} />

              {infoWindow && (
                <InfoWindow
                  position={infoWindow.position}
                  onCloseClick={closeInfoWindow}
                >
                  <div>{infoWindow.content}</div>
                </InfoWindow>
              )}
            </GoogleMapComponent>
          </div>
          
          {selectedMovie && (
            <div className='col-2'>
            <div className={styles.expandedMovie}>
              <img src={selectedMovie.image} alt={selectedMovie.title} onClick={closeMovie} />
              <div className={styles.overlay}>
                <div className={styles.cardText}>{selectedMovie.title}</div>
              </div>
            </div>
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
}





function addMovies() {
  MOVIES.push({
    key: `0`,
    title: `Oppenheimer`,
    image: 'https://www.themoviedb.org/t/p/w220_and_h330_face/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
  })

  MOVIES.push({
    key: `1`,
    title: `Fast X`,
    image: 'https://www.themoviedb.org/t/p/w220_and_h330_face/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
  })
  MOVIES.push({
    key: `2`,
    title: `Five Nights at Freddy's`,
    image: 'https://www.themoviedb.org/t/p/w220_and_h330_face/A4j8S6moJS2zNtRR8oWF08gRnL5.jpg',
  })
  MOVIES.push({
    key: `3`,
    title: `Radical`,
    image: 'https://www.themoviedb.org/t/p/w220_and_h330_face/eSatbygYZp8ooprBHZdb6GFZxGB.jpg',
  })


}
addMovies()


// ... (other imports)

function MovieCard({ title, image, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <img className={styles.cardImg} src={image} alt={title} />
      <div className={styles.overlay}>
        <div className={styles.cardText}>{title}</div>
      </div>
    </div>
  );
}


// ... (other imports)

function CardDeck({ onMovieClick }) {
  return (
    <div className="container-fluid px-2">
      
      <div className={`d-flex flex-column ${styles.cardDeck}`}>
        {MOVIES.map((movie) => (
          <MovieCard {...movie}  onClick={() => onMovieClick(movie)} />
        ))}
      </div>
    </div>
  );
}
