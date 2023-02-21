import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddButton,
  AddCardFrom,
  Card,
  Nothing,
  PopUp,
  Loader,
  CardById,
} from "../components";
import { useGetCardsQuery } from "../redux/api/cardApiSlice";
import { selectIsCardOpen, removeActiveCard } from "../redux/activeCardSlice";
import { ICard } from "../types/card";

export const Wallet: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data = [], isLoading } = useGetCardsQuery({});
  const dispatch = useDispatch();
  const isCardOpen = useSelector(selectIsCardOpen);
  const cards = data
    .map((card: ICard) => {
      return <Card key={card.id} {...card} />;
    })
    .reverse();

  return (
    <>
      <PopUp
        name="Card overview"
        open={isCardOpen}
        onClose={() => dispatch(removeActiveCard())}
      >
        <CardById onClose={() => setOpenModal(false)} />
      </PopUp>
      <PopUp name="Add card" open={openModal} onClose={() => setOpenModal(false)}>
        <AddCardFrom onClose={() => setOpenModal(false)} />
      </PopUp>
      <div className="main-container">
        <div className="block-header">
          <h2>Wallet</h2>
          {/* <span className="cash">Cash: 2500$</span> */}
          <AddButton onClick={() => setOpenModal(true)} name="Add card" />
        </div>
        <div className="block-wrapper cards">
          {isLoading ? <Loader /> : cards?.length < 1 ? <Nothing /> : cards}
        </div>
      </div>
    </>
  );
};
