import { FC } from "react";
import { Link } from "react-router-dom";
import { Input } from "./Input";

export const RegisterForm: FC = () => {
  return (
    <form>
      <h2>Register</h2>
      <Input
        label="Name"
        type="name"
        placeholder="Insert your name"
        // value={}
        // onChange={}
        required
      />
      <Input
        label="Surname"
        type="surname"
        placeholder="Insert your surname"
        // value={}
        // onChange={}
        required
      />
      <Input
        label="Email"
        type="email"
        placeholder="Insert your email"
        // value={}
        // onChange={}
        required
      />
      <Input
        label="Password"
        type="password"
        placeholder="Insert your password"
        // value={}
        // onChange={}
        required
      />
      <Input
        label="Confirm password"
        type="password"
        placeholder="Confirm your password"
        // value={}
        // onChange={}
        required
      />
      <div className="form-confirm">
        <Link to="/login">Login</Link>
        <button className="btn" type="submit">
          Register
        </button>
      </div>
    </form>
  );
};
