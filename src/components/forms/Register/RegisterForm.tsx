import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../../redux/api/authApiSlice";
import { Input } from "../Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./config";
import { setCredentials, setError, setSuccess } from "../../../redux/auth/authSlice";
import { ISignUp } from "../../../types/auth";

export const RegisterForm: FC = () => {
  const [register, isLoading] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const userData = await register(data as ISignUp).unwrap();
      dispatch(setCredentials({ ...userData }));
      isLoading.status === "fulfilled" &&
        dispatch((setSuccess as any)("You are registered! Now login"));
      navigate("/login");
    } catch (err: any) {
      if (!err?.status) {
        dispatch((setError as any)("No Server Response"));
      } else if (err.status === 400) {
        dispatch((setError as any)("Missing credentials"));
      } else {
        dispatch((setError as any)("Register Failed"));
      }
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <h2>Register</h2>
      <Input
        label="Name"
        type="name"
        placeholder="Insert your name"
        error={form.formState.errors.name}
        register={form.register("name")}
      />
      <Input
        label="Surname"
        type="surname"
        placeholder="Insert your surname"
        error={form.formState.errors.surname}
        register={form.register("surname")}
      />
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
      <Input
        label="Confirm password"
        type="password"
        placeholder="Confirm your password"
        error={form.formState.errors.confirmPassword}
        register={form.register("confirmPassword")}
      />
      <div className="form-confirm">
        <Link to="/login">Login</Link>
        <button
          className={isLoading.status === "pending" ? "btn log sending" : "btn reg"}
          type="submit"
        >
          <span>Register</span>
        </button>
      </div>
    </form>
  );
};
