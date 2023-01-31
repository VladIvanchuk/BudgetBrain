import { FC } from "react";
import {} from "../hooks";

export const Header: FC = () => {
  return (
    <header>
      <h3>Overview</h3>
      <div className="user">
        <div className="user-photo"></div>
        <span className="username">Hello {"User"}</span>
        <span className="user-balance">$ 200000</span>
      </div>
    </header>
  );
};
