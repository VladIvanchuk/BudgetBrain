import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddButton,
  AddTransaction,
  Loader,
  Nothing,
  PopUp,
  Transaction,
  TransactionById,
} from "../components";
import { removeActiveCard, selectIsCardOpen } from "../redux/activeCardSlice";
import { useGetOperationsQuery } from "../redux/api/operationApiSlice";
import { ITransaction } from "../types/card";

export const Transactions: FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data = [], isLoading } = useGetOperationsQuery({});
  const dispatch = useDispatch();
  const isCardOpen = useSelector(selectIsCardOpen);

  const transactions = data.map((operation: ITransaction) => {
    return <Transaction key={operation?.id} {...operation} />;
  });
  return (
    <>
      <PopUp
        name="Card overview"
        open={isCardOpen}
        onClose={() => dispatch(removeActiveCard())}
      >
        <TransactionById onClose={() => setOpenModal(false)} />
      </PopUp>
      <PopUp name="Add Transaction" open={openModal} onClose={() => setOpenModal(false)}>
        <AddTransaction onClose={() => setOpenModal(false)} />
      </PopUp>
      <div className="main-container">
        <div className="block-header">
          <h2>Transactions</h2>
          <AddButton onClick={() => setOpenModal(true)} name="Add transaction" />
        </div>
        <div className="transactions-wrapper">
          {isLoading ? <Loader /> : transactions?.length < 1 ? <Nothing /> : transactions}
        </div>
      </div>
    </>
  );
};
