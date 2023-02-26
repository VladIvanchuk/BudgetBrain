import { FC } from "react";
import { NavLink } from "react-router-dom";
import { cardAmountNormalize } from "../features";
import {} from "../hooks";
import { useGetUserBalanceQuery, useGetUserQuery } from "../redux/api/userApiSlice";
import { Logo } from "./Logo";

export const Header: FC = () => {
  const { data: user = {} } = useGetUserQuery({});
  const { firstName } = user;
  const { data = {} } = useGetUserBalanceQuery({});
  const { balance } = data;

  return (
    <header>
      <NavLink to="/home">
        <Logo />
      </NavLink>

      <div className="user">
        <div className="user-photo"></div>
        <span className="username">Hello {firstName}</span>
        <span className="user-balance">{cardAmountNormalize(balance)}</span>
      </div>
    </header>
  );
};
