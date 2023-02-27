import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FC } from "react";
import { GiEntryDoor } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { BiTransferAlt } from "react-icons/bi";
import { BsHouseDoorFill, BsCurrencyExchange } from "react-icons/bs";
import { IoWalletSharp } from "react-icons/io5";
import { logOut, setSuccess } from "../redux/auth/authSlice";

export const Sidebar: FC<SidebarProps> = ({ active, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutButton = () => {
    dispatch(logOut());
    dispatch((setSuccess as any)("You are Logout"));
    navigate("/login");
  };

  return (
    <div className={`sidebar${active ? " active" : ""}`}>
      <div className="sidebar-container">
        <nav onClick={onClose}>
          <NavLink active-classname="active" to="/home">
            <BsHouseDoorFill /> Home
          </NavLink>
          <NavLink active-classname="active" to="/transactions">
            <BiTransferAlt /> Transactions
          </NavLink>
          <NavLink active-classname="active" to="/wallet">
            <IoWalletSharp /> Wallet
          </NavLink>
          <NavLink active-classname="active" to="/currencies">
            <BsCurrencyExchange /> Currencies
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
interface SidebarProps {
  active: boolean;
  onClose: () => void;
}
