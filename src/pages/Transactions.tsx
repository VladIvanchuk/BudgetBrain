import { FC } from "react";

import { BsPlusLg } from "react-icons/bs";
import { Transaction } from "../components";

export const Transactions: FC = () => {
  const data = [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const tarns = data.map((el) => {
    return <Transaction key={el} />;
  });
  return (
    <div className="main-container">
      <div className="block-header">
        <h2>Transactions</h2>
        <button>
          <BsPlusLg />
          <span>Add transaction</span>
        </button>
      </div>
      <div className="transactions-wrapper">{tarns}</div>
    </div>
  );
};
