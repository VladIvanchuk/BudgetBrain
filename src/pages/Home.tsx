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
} from "../components";

import { useGetOperationsQuery } from "../redux/api/operationApiSlice";
import { removeActivePopUp, selectIsPopUpOpen } from "../redux/popUpSlice";
import { ITransaction } from "../types/card";

export const Home: FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { data = [], isLoading } = useGetOperationsQuery({});
  const isCardOpen = useSelector(selectIsPopUpOpen);

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
              <div className="block-header">
                <h4>Analytics</h4>
              </div>
              <div className="block-content">{<Nothing />}</div>
            </div>
          </div>
          <div className="home-container currency">{<Currency />}</div>
        </div>
        <div className="home-wrapper operations">
          <div className="home-block">
            <div className="block-header">
              <h4>Recent Transactions:</h4>
              <NavLink className="operations-link" to="/transactions">
                See more ➤
              </NavLink>
            </div>
            {isLoading ? (
              <Loader />
            ) : transactions?.length < 1 ? (
              <Nothing />
            ) : (
              transactions
            )}
            <div className="block-content"></div>
            <AddButton onClick={() => setOpenModal(true)} name="Add transaction" />
          </div>
        </div>
      </main>
    </>
  );
};
