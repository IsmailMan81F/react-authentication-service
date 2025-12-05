import "../styles/App.css";
import { Routes, Route, NavLink } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import NotFound from "./NotFound";
import Home from "./Home";
import Profile from "./Profile";
import ProtectedRoute from "./ProtectedRoute";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

export default function App() {
  const { auth } = useContext(AuthContext);
  return (
    <>
      <nav className="navbar">
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/profile" className={!auth ? "disabled-link" : ""}>
          Profile
        </NavLink>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
