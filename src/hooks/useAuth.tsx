import { useSelector, useDispatch } from "react-redux";
import { setToken, setUser } from "../store/store";

export const useAuth = () => {
  const token = useSelector((state) => state.auth.token);
  const email = useSelector((state) => state.auth.email);
  const name = useSelector((state) => state.auth.name);
  const dispatch = useDispatch();

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      dispatch(setToken(data.token));
      dispatch(setUser({ email, name: data.name }));
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    dispatch(setToken(""));
    dispatch(setUser({ email: "", name: "" }));
  };

  const register = async (email: string, name: string, password: string) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, password }),
      });
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      dispatch(setToken(data.token));
      dispatch(setUser({ email, name }));
    } catch (error) {
      console.error(error);
    }
  };

  return { token, email, name, login, logout, register };
};
