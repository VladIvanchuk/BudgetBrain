import { FC } from "react";
import { AddButton, Nothing } from "../components";

export const Goals: FC = () => {
  return (
    <div className="main-container">
      <div className="block-header">
        <h2>Goals</h2>
        <AddButton name="Add a new goal" />
      </div>
      <div className="block-wrapper">{<Nothing />} </div>
    </div>
  );
};
