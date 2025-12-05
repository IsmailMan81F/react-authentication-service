import "../styles/Profile.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

export default function Profile() {
  const navigate = useNavigate();
  const { user, setUser, setAuth } = useContext(AuthContext);

  const logout = async () => {
    localStorage.setItem("accessToken", "");
    setAuth(false);
    setUser(null);
    navigate("/", { replace: true });
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">PROFILE</h1>
      <h2 className="profile-subtitle">Hello {user.username}</h2>
      <p className="profile-text">We are so happy to reach you here.</p>
      <button onClick={logout} className="profile-logout">
        Log out
      </button>
    </div>
  );
}
