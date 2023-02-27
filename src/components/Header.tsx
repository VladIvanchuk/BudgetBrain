import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import { cardAmountNormalize } from "../features";
import { useGetUserBalanceQuery, useGetUserQuery } from "../redux/api/userApiSlice";
import { Logo } from "./Logo";
import { Sidebar } from "./Sidebar";

export const Header: FC = () => {
  const { data: user = {} } = useGetUserQuery({});
  const { data = {} } = useGetUserBalanceQuery({});
  const { balance } = data;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSidebarOpen(event.target.checked);
  };

  return (
    <>
      <header>
        <NavLink to="/home">
          <Logo />
        </NavLink>

        <div className="user">
          <div className="user-photo"></div>
          <span className="username">Hello {user.firstName}</span>
          <span className="user-balance">
            {cardAmountNormalize(balance ? balance : 0)}
          </span>
        </div>
        <label htmlFor="burger" className="burger">
          <input
            className={sidebarOpen ? "menu-active" : ""}
            id="burger"
            type="checkbox"
            checked={sidebarOpen}
            onChange={handleCheckboxChange}
          />
          <span></span>
          <span></span>
          <span></span>
        </label>
      </header>
      <Sidebar onClose={() => setSidebarOpen(false)} active={sidebarOpen} />
    </>
  );
};
