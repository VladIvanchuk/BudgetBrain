import { cardAmountNormalize } from "../features";
import { ITransaction } from "../types/card";
import { parseISO, format } from "date-fns";
import { useDispatch } from "react-redux";
import { setActiveCard } from "../redux/activeCardSlice";

export const Transaction: React.FC<ITransaction> = (props) => {
  const { id, name, sum, type, category, createdAt } = props;
  const isPositive = type === 1 ? true : false;
  const formattedDate = format(parseISO(createdAt), "dd MMMM yyyy");
  const dispatch = useDispatch();

  return (
    <div
      className={isPositive ? "transaction  positive" : "transaction  negative"}
      onClick={() => dispatch(setActiveCard({ id: id }))}
    >
      <div className="icon"></div>
      <div className="text">
        <div className="top">
          <span className="name">{name}</span>
          <span className="date">{formattedDate}</span>
        </div>
        <div className="bottom">
          <span className="category">{category}</span>
          <span className="sum">
            {isPositive ? "+ " : "- "}
            {cardAmountNormalize(sum)}
          </span>
        </div>
      </div>
    </div>
  );
};
