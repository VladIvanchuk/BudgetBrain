import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
import {
  AddButton,
  AddTransaction,
  Currency,
  Loader,
  Nothing,
  PopUp,
  Transaction,
  TransactionById,
  Analytics,
} from "../components";

import { useGetOperationsQuery } from "../redux/api/operationApiSlice";
import { removeActivePopUp, selectIsPopUpOpen } from "../redux/popUpSlice";
import { ITransaction } from "../types/card";
import { motion } from "framer-motion";
import { useGetCardsQuery } from "../redux/api/cardApiSlice";
import { setError } from "../redux/auth/authSlice";

export const Home: FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { data = [], isLoading } = useGetOperationsQuery({});
  const { data: cards = [] } = useGetCardsQuery({});
  const isCardOpen = useSelector(selectIsPopUpOpen);
  const currenciesToShow = ["UAH", "EUR", "USD"];
  const transactions = data
    .map((operation: ITransaction) => {
      return <Transaction key={operation?.id} {...operation} homepage />;
    })
    .reverse()
    .slice(0, 6);

  return (
    <>
      <PopUp
        name="Operation overview"
        open={isCardOpen}
        onClose={() => dispatch(removeActivePopUp())}
      >
        <TransactionById />
      </PopUp>
      <PopUp name="Add Transactions" open={openModal} onClose={() => setOpenModal(false)}>
        <AddTransaction onClose={() => setOpenModal(false)} />
      </PopUp>
      <main className="home">
        <div className="home-wrapper">
          <div className="home-container">
            <div className="home-block">
              <Analytics />
            </div>
          </div>
          <div className="home-container currency">
            <div className="home-block">
              <NavLink className="operations-link" to="/currencies">
                See more ➤
              </NavLink>
              {<Currency currenciesToShow={currenciesToShow} tittle="Currency Rates" />}
            </div>
          </div>
        </div>
        <div className="home-wrapper operations">
          <div className="home-block">
            <div className="block-header">
              <h4>Recent Transactions:</h4>
              <NavLink className="operations-link" to="/transactions">
                See more ➤
              </NavLink>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="block-content transactions"
            >
              {isLoading ? (
                <Loader />
              ) : transactions?.length < 1 ? (
                <Nothing />
              ) : (
                transactions
              )}
            </motion.div>
            <AddButton
              onClick={() =>
                cards.length > 0
                  ? setOpenModal(true)
                  : dispatch(
                      (setError as any)(
                        "Currently, you have no cards! You can create one in your wallet."
                      )
                    )
              }
              name="Add transaction"
            />
          </div>
        </div>
      </main>
    </>
  );
};
