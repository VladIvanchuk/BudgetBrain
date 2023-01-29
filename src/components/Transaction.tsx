import { FC } from "react";

export const Transaction: FC = () => {
  return (
    <div className="transaction negative">
      <div className="icon"></div>
      <div className="text">
        <div className="top">
          <span className="name">Taxi</span>
          <span className="date">Today</span>
        </div>
        <div className="bottom">
          <span className="category">Transport</span>
          <span className="sum">-50 $</span>
        </div>
      </div>
    </div>
  );
};
