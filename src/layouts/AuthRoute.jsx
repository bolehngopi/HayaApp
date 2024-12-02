import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"

export const AuthRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <Outlet />
  )
}