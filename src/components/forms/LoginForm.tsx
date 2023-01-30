import React, { FC, useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setCredentials } from "../../redux/auth/authSlice";
import { useLoginMutation } from "../../redux/api/authApiSlice";
import { Input } from "./Input";

export const LoginForm: FC = () => {
  const userRef = useRef<HTMLInputElement | null>(null);
  const [errMsg, setErrMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userData }));
      setEmail("");
      setPassword("");
      navigate("/home");
    } catch (err: any) {
      if (!err?.status) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("User doesn't exist");
      } else {
        setErrMsg("Login Failed");
      }
      if (userRef.current) {
        userRef.current.focus();
      }
    }
  };

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <Input
        label="Email"
        type="email"
        placeholder="Insert your email"
        value={email}
        onChange={handleUserInput}
        required
      />
      <Input
        label="Password"
        type="password"
        placeholder="Insert your password"
        value={password}
        onChange={handlePasswordInput}
        required
      />
      <div className="form-confirm">
        <Link to="/sign-up">Register</Link>
        <button className="btn" type="submit">
          Login
        </button>
      </div>
    </form>
  );
};
