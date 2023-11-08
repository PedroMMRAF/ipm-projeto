import { Container } from 'react-bootstrap';

import MyNavbar from '@/components/Navbar';

export default function HomePage() {
  return (
    <div>
      <MyNavbar />
      <Container>
        <h2>Welcome to the modern movie database!</h2>
      </Container>
    </div>
  )
}
