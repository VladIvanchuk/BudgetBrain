import { useDispatch, useSelector } from "react-redux";
import { CardAmountNormalize } from "../features";
import { removeActiveCard, selectActiveCard } from "../redux/activeCardSlice";
import {
  useDeleteCardByIdMutation,
  useGetCardByIdQuery,
  useGetCardsQuery,
} from "../redux/api/cardApiSlice";
import { ITransaction } from "../types/card";
import { IPopUp } from "../types/popup";
import { Loader } from "./Loader";
import { Nothing } from "./Nothing";
import { Transaction } from "./Transaction";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { setError, setSuccess } from "../redux/auth/authSlice";

export const CardById: React.FC<IPopUp> = ({ onClose }) => {
  const dispatch = useDispatch();
  const activeCard = useSelector(selectActiveCard);
  const { data = [], isLoading } = useGetCardByIdQuery(activeCard);
  console.log(useGetCardByIdQuery(activeCard));
  const { id, numberCard, cardAmount, cardName, operations } = data;
  const [deleteCardById] = useDeleteCardByIdMutation(id);
  const { refetch } = useGetCardsQuery({});

  const transactions = operations?.map((operation: ITransaction) => {
    return <Transaction key={operation.id} {...operation} />;
  });

  const handleDelete = async () => {
    try {
      await deleteCardById(id);
      dispatch((setSuccess as any)("Card deleted"));
      dispatch(removeActiveCard());
      refetch();
    } catch (err: any) {
      if (!err?.status) {
        dispatch((setError as any)("No Server Response"));
      } else {
        dispatch((setError as any)(err.data));
      }
    }
  };

  return (
    <div className="card-by-id">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="buttons">
            <button className="edit button">
              <FiEdit3 /> Edit
            </button>
            <button className="remove button" onClick={() => handleDelete()}>
              <FiTrash2 /> Remove
            </button>
          </div>
          <div className="card-info">
            <div className="card-info-item">
              <h3>Card name:</h3>
              <span>{cardName}</span>
            </div>
            <div className="card-info-item">
              <h3>Card amount:</h3>
              <span>{CardAmountNormalize(cardAmount)}</span>
            </div>
            <div className="card-info-item">
              <h3>Card number:</h3>
              <span>{numberCard}</span>
            </div>
          </div>
          <div>
            <h3>Last operations:</h3>
            <div className="transactions">
              {operations?.length < 1 ? <Nothing /> : transactions}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
