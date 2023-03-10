import { FcSimCardChip } from "react-icons/fc";
import { MdOutlineContactless } from "react-icons/md";
import { useDispatch } from "react-redux";
import { cardAmountNormalize } from "../features";
import { cardType } from "../features/cardType";
import { setActivePopUp } from "../redux/popUpSlice";
import { ICard } from "../types/card";

export const Card: React.FC<ICard> = (props) => {
  const { id, numberCard, cardAmount, cardName, color } = props;
  const dispatch = useDispatch();

  return (
    <>
      <div className="flip-card" onClick={() => dispatch(setActivePopUp({ id: id }))}>
        <div className="flip-card-inner">
          <div className="flip-card-front" style={{ backgroundColor: color.value }}>
            <p className="heading">{cardName}</p>
            {cardType(numberCard)}
            <FcSimCardChip className="chip" />
            <MdOutlineContactless className="contactless" />
            <p className="number">{numberCard}</p>
            <p className="balance">{cardAmountNormalize(cardAmount)}</p>
            <p className="name">BRUCE WAYNE</p>
          </div>
          <div className="flip-card-back" style={{ backgroundColor: color.value }}>
            <div className="strip"></div>
            <div className="mstrip"></div>
            <div className="sstrip">
              <p className="code">***</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
