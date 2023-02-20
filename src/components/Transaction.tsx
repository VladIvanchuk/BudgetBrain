import { CardAmountNormalize } from "../features";
import { ITransaction } from "../types/card";
import { parseISO, format } from "date-fns";

export const Transaction: React.FC<ITransaction> = (props) => {
  const { name, sum, type, category, createdAt } = props;
  const isPositive = type === 1 ? true : false;
  const formattedDate = format(parseISO(createdAt), "dd MMMM yyyy");

  return (
    <div className={isPositive ? "transaction  positive" : "transaction  negative"}>
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
            {CardAmountNormalize(sum)}
          </span>
        </div>
      </div>
    </div>
  );
};
