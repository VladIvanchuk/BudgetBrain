import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/auth/authSlice";

export const useStateToken = () => {
  const token = useSelector(selectCurrentToken);
  return {
    isAuth: !!token,
  };
};
