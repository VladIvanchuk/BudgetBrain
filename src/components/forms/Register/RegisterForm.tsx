import { FC } from "react";
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
      dispatch((setSuccess as any)("You are registered! Now login"));
      navigate("/login");
    } catch (err: any) {
      if (err.data?.title) {
        dispatch((setError as any)(err.data.title));
      } else {
        dispatch((setError as any)("No Server Response"));
      }
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <h2 className="form-header">Register</h2>
      <Input
        label="Name"
        type="name"
        placeholder="Insert your name"
        error={form.formState.errors.firstName}
        register={form.register("firstName")}
      />
      <Input
        label="Surname"
        type="surname"
        placeholder="Insert your surname"
        error={form.formState.errors.lastName}
        register={form.register("lastName")}
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
        <Link className="to" to="/login">
          Login
          <span></span>
        </Link>
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
