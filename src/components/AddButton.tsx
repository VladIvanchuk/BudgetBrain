import React from "react";
import { BsPlusLg } from "react-icons/bs";

export const AddButton: React.FC<IButton> = ({ onClick, name }) => {
  return (
    <button onClick={onClick}>
      <BsPlusLg />
      <span>{name}</span>
    </button>
  );
};
interface IButton {
  name: string;
  onClick?: () => void;
}
