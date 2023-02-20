import { FcSimCardChip } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { CardAmountNormalize, CardNumberNormalize } from "../features";
import { setActiveCard } from "../redux/activeCardSlice";
import { ICard } from "../types/card";

export const Card: React.FC<ICard> = (props) => {
  const { id, numberCard, cardAmount, cardName } = props;
  const dispatch = useDispatch();

  return (
    <>
      <div className="card" onClick={() => dispatch(setActiveCard({ id: id }))}>
        <div className="name">{cardName}</div>
        <FcSimCardChip />
        <div className="number">{CardNumberNormalize(numberCard)}</div>
        <div className="balance">{CardAmountNormalize(cardAmount)}</div>
      </div>
    </>
  );
};
