import React from "react";
import { BsPlusLg } from "react-icons/bs";

export const AddButton: React.FC<IButton> = ({ onClick, name }) => {
  return (
    <button className="button" onClick={onClick}>
      <div className="icon">
        <BsPlusLg />
      </div>
      <span>{name}</span>
    </button>
  );
};
interface IButton {
  name: string;
  onClick?: () => void;
}
