import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { FC } from "react";
import { GiChest, GiEntryDoor, GiStairsGoal } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { BiTransferAlt } from "react-icons/bi";
import { BsHouseDoorFill } from "react-icons/bs";
import { IoWalletSharp } from "react-icons/io5";
import { logOut, setSuccess } from "../redux/auth/authSlice";

export const Sidebar: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutButton = () => {
    dispatch(logOut());
    dispatch((setSuccess as any)("You are Logout"));
    navigate("/login");
  };
  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <nav>
          <NavLink active-classname="active" to="/home">
            <BsHouseDoorFill /> Home
          </NavLink>
          <NavLink active-classname="active" to="/transactions">
            <BiTransferAlt /> Transactions
          </NavLink>
          <NavLink active-classname="active" to="/wallet">
            <IoWalletSharp /> Wallet
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
    </div>
  );
};
