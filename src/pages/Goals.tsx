import { FC } from "react";
import { BsPlusLg } from "react-icons/bs";

export const Goals: FC = () => {
  return (
    <div className="main-container">
      <div className="block-header">
        <h2>Goals</h2>
        <button>
          <BsPlusLg />
          <span>Add a new goal</span>
        </button>
      </div>
      <div className="block-wrapper"></div>
    </div>
  );
};
