import { FC, useState } from "react";
import {
  AddButton,
  AddTransaction,
  Loader,
  Nothing,
  PopUp,
  Transaction,
} from "../components";

export const Transactions: FC = () => {
  const [openModal, setOpenModal] = useState(false);

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
        <div className="transactions-wrapper">
          {/* {<Loader />} */}
          {<Nothing />}
          {/* {transactions} */}
        </div>
      </div>
    </>
  );
};
