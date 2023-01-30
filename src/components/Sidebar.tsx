import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { FC } from "react";
import { AiFillHome } from "react-icons/ai";
import { GiChest, GiEntryDoor, GiStairsGoal } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { BiTransferAlt } from "react-icons/bi";
import { logOut } from "../redux/auth/authSlice";

export const Sidebar: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutButton = () => {
    dispatch(logOut());
    navigate("/login");
  };
  return (
    <aside>
      <div className="sidebar-wrapper">
        <div className="logo">
          <h2>
            Budget<span>Brain</span>
          </h2>
        </div>
        <nav>
          <NavLink active-classname="active" to="/home">
            <AiFillHome /> Home
          </NavLink>
          <NavLink active-classname="active" to="/transactions">
            <BiTransferAlt /> Transactions
          </NavLink>
          <NavLink active-classname="active" to="/money-box">
            <GiChest /> MoneyBox
          </NavLink>
          <NavLink active-classname="active" to="/goals">
            <GiStairsGoal /> Goals
          </NavLink>
          <NavLink active-classname="active" to="/profile">
            <CgProfile /> Profile
          </NavLink>
        </nav>
        <button className="out" onClick={logOutButton}>
          Log out <GiEntryDoor />
        </button>
      </div>
    </aside>
  );
};
