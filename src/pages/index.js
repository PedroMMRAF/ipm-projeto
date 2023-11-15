import { Card, Container } from 'react-bootstrap';

import MyNavbar from '@/components/Navbar';

import styles from '@/styles/index.module.css';

let MOVIES = [];

for (let i = 1; i < 21; i++) {
  MOVIES.push({
    key: `movie-${i}`,
    title: `Movie ${i}`,
    image: 'https://via.placeholder.com/200x300',
  })
}

function MovieCard({ title, description, image, footer }) {
  return (
    <div className={styles.card}>
      <img className={styles.card} src={image} />
      <div className={styles.overlay}>
        <div className={styles.cardText}>{title}</div>
      </div>
    </div>
  )
}

function CardDeck() {
  // horizontally scrollable card deck
  return (
    <div className={`container-fluid py-2 ${styles.cardDeck}`}>
      <div className={`d-flex flex-row flex-nowrap overflow-auto ${styles.cardDeck}`}>
        {MOVIES.map((movie) => (
          <MovieCard {...movie} />
        ))}
      </div>
    </div>

  )
}

export default function HomePage() {
  return (
    <div>
      <MyNavbar />
      <Container>
        <h2>Welcome to the modern movie database!</h2>
      </Container>
      <Container>
        <hr></hr>
        <h3>Trending Movies</h3>
        <CardDeck />
        <br></br>
        <h3>Popular Movies</h3>
        <CardDeck />
        <br></br>
        <h3>Top Movies</h3>
        <CardDeck />
      </Container>
    </div>
  )
}
