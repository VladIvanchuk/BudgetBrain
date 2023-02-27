import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./config";
import { setCredentials, setError, setSuccess } from "../../../redux/auth/authSlice";
import { useLoginMutation } from "../../../redux/api/authApiSlice";
import { Input } from "../Input";
import { ILogin } from "../../../types/auth";
import { useGetOperationsQuery } from "../../../redux/api/operationApiSlice";
import { useGetCardsQuery } from "../../../redux/api/cardApiSlice";
import { useGetUserBalanceQuery } from "../../../redux/api/userApiSlice";

export const LoginForm: FC = () => {
  const navigate = useNavigate();
  const [login, isLoading] = useLoginMutation();
  const { refetch: refetchOperations } = useGetOperationsQuery({});
  const { refetch: refetchCards } = useGetCardsQuery({});
  const { refetch: refetchBalance } = useGetUserBalanceQuery({});
  const dispatch = useDispatch();

  const form = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const userData = await login(data as ILogin).unwrap();
      dispatch(setCredentials({ ...userData }));
      navigate("/home");
      dispatch((setSuccess as any)("Welcome back!"));
      refetchOperations();
      refetchCards();
      refetchBalance();
    } catch (err: any) {
      if (!err?.status) {
        dispatch((setError as any)("No Server Response"));
      } else {
        dispatch((setError as any)(err.data));
      }
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <h2 className="form-header">Login</h2>
      <Input
        label="Email"
        type="email"
        placeholder="Insert your email"
        error={form.formState.errors.email}
        register={form.register("email")}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Insert your password"
        error={form.formState.errors.password}
        register={form.register("password")}
      />
      <div className="form-confirm">
        <Link className="to" to="/sign-up">
          Register
          <span></span>
        </Link>
        <button
          className={isLoading.status === "pending" ? "btn log sending" : "btn log"}
          type="submit"
        >
          <span>Login</span>
        </button>
      </div>
    </form>
  );
};
