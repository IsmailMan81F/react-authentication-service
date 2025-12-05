import { Link } from "react-router-dom";
import "../styles/NotFound.css";

export default function NotFound() {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <h2 className="notfound-subtitle">Page Not Found</h2>

      <p className="notfound-text">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link to="/" className="notfound-btn">
        Go Back Home
      </Link>
    </div>
  );
}
