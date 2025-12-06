import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { AuthContext } from "../context/AuthProvider";
import { useContext, useState } from "react";
import { Signin } from "./api/api";
import AuthLoader from "./AuthLoader";

export default function Login() {
  const navigate = useNavigate();
  const { setAuth, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    setLoading(true);
    try {
      const accessToken = await Signin(data);
      localStorage.setItem("accessToken", accessToken);
      setUser(data);
      setAuth(true);
      navigate("/profile");
    } catch (error) {
      setAuth(false);
      setUser(null);
      console.error(error);
      alert(error);
      e.target.reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" placeholder="Enter username" name="username" />

        <label>Password</label>
        <input type="password" placeholder="Enter password" name="password" />

        <button type="submit" className="login-btn">
          {loading ? <AuthLoader /> : "Login"}
        </button>
      </form>

      <p className="register-text">
        Don't have an account?{" "}
        <Link to="/register" className="register-link">
          Register now
        </Link>
      </p>
    </div>
  );
}
