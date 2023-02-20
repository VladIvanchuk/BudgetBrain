import { FC } from "react";
import { Nothing } from "../components";

export const MoneyBox: FC = () => {
  return (
    <div className="main-container">
      <div className="block-header">
        <h2>MoneyBox</h2>
      </div>
      <div className="block-wrapper"> {<Nothing />}</div>
    </div>
  );
};
