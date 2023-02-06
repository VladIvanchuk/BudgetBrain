import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import { AddButton, AddTransaction, Nothing, PopUp, Transaction } from "../components";

export const Home: FC = () => {
  const data = [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const [openModal, setOpenModal] = useState(false);

  const tarns = data
    .map((el) => {
      return <Transaction key={el} />;
    })
    .slice(0, 6);

  return (
    <>
      <PopUp name="Add Transaction" open={openModal} onClose={() => setOpenModal(false)}>
        <AddTransaction onClose={() => setOpenModal(false)} />
      </PopUp>
      <main className="home">
        <div className="home-wrapper operations">
          <div className="home-block">
            <div className="block-header">
              <h4>Last operations</h4>
              <AddButton onClick={() => setOpenModal(true)} name="Add transaction" />
            </div>
            <div className="block-content">{tarns}</div>
            <NavLink className="operations-link" to="/transactions">
              See more ➤
            </NavLink>
          </div>
        </div>
        <div className="home-wrapper">
          <div className="home-container">
            <div className="home-block">
              <div className="block-header">
                <h4>Balance</h4>
              </div>
              <div className="block-content"></div>
            </div>
          </div>
          <div className="home-container">
            <div className="home-block">
              <div className="block-header">
                <h4>Saving goals</h4>
              </div>
              <div className="block-content"></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
