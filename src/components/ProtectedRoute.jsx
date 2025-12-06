import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { VerifyAuth } from "./api/api";
import Loader from "./Loader";

const wait = () =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, 4000);
  });

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { setAuth, setUser, user } = useContext(AuthContext);

  useEffect(() => {
    async function verification() {
      const accessToken = localStorage.getItem("accessToken");
      try {
        await VerifyAuth(accessToken);
        setAuth(true);
      } catch (error) {
        console.error(error);
        setUser(null);
        setAuth(false);
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    }
    verification();
  }, []);

  if (loading) return <Loader />;

  return children;
}
