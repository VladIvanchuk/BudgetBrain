import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useLocalToken } from "../hooks";

export const RequireAuth = () => {
  const location = useLocation();
  const { isAuth } = useLocalToken();

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
