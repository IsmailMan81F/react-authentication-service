import { Link } from "react-router-dom";
import "../styles/Register.css";
import { Signup } from "./api/api";
import { useNavigate } from "react-router-dom";
import AuthLoader from "./AuthLoader";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const r = {
      user: 1000,
      editor: 2000,
      admin: 3000,
    };

    data.roles = { [data.roles]: r[data.roles] };

    try {
      await Signup(data);
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert(error);
      e.target.reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>

      <form className="register-form" onSubmit={handleSubmit}>
        {/* Username */}
        <label>Username</label>
        <input type="text" placeholder="Enter username" name="username" />

        {/* Password */}
        <label>Password</label>
        <input type="password" placeholder="Enter password" name="password" />

        {/* Role */}
        <label>Role</label>
        <select name="roles">
          <option value="user">User</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>

        {/* Submit */}
        <button type="submit" className="register-btn" disabled={loading}>
          {loading ? <AuthLoader /> : "Register"}
        </button>
      </form>

      <p className="login-text">
        Already have an account?{" "}
        <Link to="/login" className="login-link">
          Login here
        </Link>
      </p>
    </div>
  );
}
