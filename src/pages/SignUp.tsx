import { FC } from "react";
import { Logo, RegisterForm } from "../components";

export const SignUp: FC = () => {
  return (
    <div className="authorization">
      <Logo />
      <RegisterForm />
    </div>
  );
};
