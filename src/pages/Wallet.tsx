import { useState } from "react";
import { AddButton, AddCardFrom, Card, PopUp } from "../components";

export const Wallet = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <PopUp name="Add card" open={openModal} onClose={() => setOpenModal(false)}>
        <AddCardFrom onClose={() => setOpenModal(false)} />
      </PopUp>
      <div className="main-container">
        <div className="block-header">
          <h2>Wallet</h2> <span className="cash">Cash: 2500$</span>
          <AddButton onClick={() => setOpenModal(true)} name="Add card" />
        </div>
        <div className="block-wrapper cards">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
};
