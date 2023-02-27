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
import { selectIsPopUpOpen, removeActivePopUp } from "../redux/popUpSlice";
import { useGetOperationsQuery } from "../redux/api/operationApiSlice";
import { ITransaction } from "../types/card";
import { motion } from "framer-motion";

export const Transactions: FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data = [], isLoading } = useGetOperationsQuery({});
  const dispatch = useDispatch();
  const isCardOpen = useSelector(selectIsPopUpOpen);

  const transactions = data
    .map((operation: ITransaction) => {
      return <Transaction key={operation?.id} {...operation} />;
    })
    .reverse();
  return (
    <>
      <PopUp
        name="Operation overview"
        open={isCardOpen}
        onClose={() => dispatch(removeActivePopUp())}
      >
        <TransactionById />
      </PopUp>
      <PopUp name="Add Transaction" open={openModal} onClose={() => setOpenModal(false)}>
        <AddTransaction onClose={() => setOpenModal(false)} />
      </PopUp>
      <main className="main-container">
        <div className="block-header">
          <h2>Transactions</h2>
          <AddButton onClick={() => setOpenModal(true)} name="Add transaction" />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="block-wrapper transactions"
        >
          {isLoading ? <Loader /> : transactions?.length < 1 ? <Nothing /> : transactions}
        </motion.div>
      </main>
    </>
  );
};
