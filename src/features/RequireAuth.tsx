import { useLocation, Navigate, Outlet } from "react-router-dom";
import { Loader } from "../components";
import { useLocalToken } from "../hooks";
import { useValidateTokenQuery } from "../redux/api/authApiSlice";

export const RequireAuth = (): JSX.Element => {
  const location = useLocation();
  const { isAuth } = useLocalToken();
  const { isSuccess, isLoading } = useValidateTokenQuery({}, { skip: !isAuth });

  if (isLoading) {
    return <Loader />;
  }

  return isSuccess ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
