import { FC } from "react";
import {} from "../hooks";
import { Logo } from "./Logo";

export const Header: FC = () => {
  return (
    <header>
      <Logo />
      <div className="user">
        <div className="user-photo"></div>
        <span className="username">Hello {"User"}</span>
        <span className="user-balance">$ 200000</span>
      </div>
    </header>
  );
};
