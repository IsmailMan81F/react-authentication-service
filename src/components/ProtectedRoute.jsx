import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import { VerifyAuth } from "./api";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { setAuth, setUser, user } = useContext(AuthContext);

  useEffect(() => {
    async function verification() {
      const accessToken = localStorage.getItem("accessToken");
      try {
        if (!user) throw new Error("Go log in");
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

  if (loading) return <div>Loading ...</div>;

  return children;
}
