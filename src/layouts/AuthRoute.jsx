import { useContext } from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { AuthContext } from "../providers/AuthProvider";

export const AuthRoute = () => {
  const navigate = useNavigate();
  const {session} = useContext(AuthContext);

  useEffect(() => {
    if (!session) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <Outlet />
  )
}