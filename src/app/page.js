import 'bootstrap/dist/css/bootstrap.css';
import './page.scss';
import MyNavbar from './navbar.js';

export default function Home() {
  return (
    <div>
      <MyNavbar />
      <div className="container mt-4">
        <h2>Welcome to the modern movie database!</h2>
      </div>
    </div>
  )
}
