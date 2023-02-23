import { cardAmountNormalize } from "../features";
import { ITransaction } from "../types/card";
import { parseISO, format } from "date-fns";
import { useDispatch } from "react-redux";
import { setActivePopUp } from "../redux/popUpSlice";

export const Transaction: React.FC<ITransaction> = (props) => {
  const { id, name, sum, type, category, createdAt, homepage } = props;
  const isPositive = type === 1 ? true : false;

  const formattedDate = format(parseISO(createdAt), "dd MMMM yyyy");
  const dispatch = useDispatch();

  const shortName = name.length > 12 ? name.slice(0, 12) + "..." : name;

  return (
    <div
      className={isPositive ? "transaction  positive" : "transaction  negative"}
      onClick={() => dispatch(setActivePopUp({ id: id }))}
    >
      <div dangerouslySetInnerHTML={{ __html: category.image }} className="icon"></div>
      <div className="text">
        <div className="top">
          <span className="name">{homepage ? shortName : name}</span>
          <span className="date">{formattedDate}</span>
        </div>
        <div className="bottom">
          <span className="category">{category.name}</span>
          <span className="sum">
            {isPositive ? "+ " : "- "}
            {cardAmountNormalize(sum)}
          </span>
        </div>
      </div>
    </div>
  );
};
