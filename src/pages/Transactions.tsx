import { FC, useState } from "react";
import { AddButton, AddTransaction, PopUp, Transaction } from "../components";

export const Transactions: FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const data = [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const tarns = data.map((el) => {
    return <Transaction key={el} />;
  });

  return (
    <>
      <PopUp name="Add Transaction" open={openModal} onClose={() => setOpenModal(false)}>
        <AddTransaction onClose={() => setOpenModal(false)} />
      </PopUp>
      <div className="main-container">
        <div className="block-header">
          <h2>Transactions</h2>
          <AddButton onClick={() => setOpenModal(true)} name="Add transaction" />
        </div>
        <div className="transactions-wrapper">{tarns}</div>
      </div>
    </>
  );
};
