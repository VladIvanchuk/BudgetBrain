import { FcSimCardChip } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { cardAmountNormalize, cardNumberNormalize } from "../features";
import { cardType } from "../features/cardType";
import { setActivePopUp } from "../redux/popUpSlice";
import { ICard } from "../types/card";

export const Card: React.FC<ICard> = (props) => {
  const { id, numberCard, cardAmount, cardName, colorValue } = props;
  const dispatch = useDispatch();

  return (
    <>
      <div
        className="card"
        style={{ backgroundColor: colorValue }}
        onClick={() => dispatch(setActivePopUp({ id: id }))}
      >
        <div className="name">{cardName}</div>
        <FcSimCardChip />
        <div className="card-type">{cardType(numberCard)}</div>
        <div className="number">{cardNumberNormalize(numberCard)}</div>
        <div className="balance">{cardAmountNormalize(cardAmount)}</div>
      </div>
    </>
  );
};
