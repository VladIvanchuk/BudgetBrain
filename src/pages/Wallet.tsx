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
import { selectIsPopUpOpen, removeActivePopUp } from "../redux/popUpSlice";
import { ICard } from "../types/card";
import { motion } from "framer-motion";

export const Wallet: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { data = [], isLoading } = useGetCardsQuery({});
  const cards = data
    .map((card: ICard) => {
      return <Card key={card.id} {...card} />;
    })
    .reverse();

  return (
    <>
      <PopUp
        name="Card overview"
        open={useSelector(selectIsPopUpOpen)}
        onClose={() => dispatch(removeActivePopUp())}
      >
        <CardById />
      </PopUp>
      <PopUp name="Add card" open={openModal} onClose={() => setOpenModal(false)}>
        <AddCardFrom onClose={() => setOpenModal(false)} />
      </PopUp>
      <main className="main-container">
        <div className="block-header">
          <h2>Wallet</h2>
          {/* <span className="cash">Cash: 2500$</span> */}
          <AddButton onClick={() => setOpenModal(true)} name="Add card" />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="block-wrapper cards"
        >
          {isLoading ? <Loader /> : cards?.length < 1 ? <Nothing /> : cards}
        </motion.div>
      </main>
    </>
  );
};
