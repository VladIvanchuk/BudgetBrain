import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AddButton,
  AddTransaction,
  Loader,
  Nothing,
  PopUp,
  Transaction,
} from "../components";

export const Home: FC = () => {
  const [openModal, setOpenModal] = useState(false);

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
            <div className="block-content">
              {/* {<Loader />} */}
              {<Nothing />}
              {/* {transactions} */}
            </div>
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
              <div className="block-content">{<Nothing />}</div>
            </div>
          </div>
          <div className="home-container">
            <div className="home-block">
              <div className="block-header">
                <h4>Saving goals</h4>
              </div>
              <div className="block-content">{<Nothing />}</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
