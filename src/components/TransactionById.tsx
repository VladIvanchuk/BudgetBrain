import { useDispatch, useSelector } from "react-redux";
import { removeActiveCard, selectActiveCard } from "../redux/activeCardSlice";
import { IPopUp } from "../types/popup";
import { Loader } from "./Loader";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { setError, setSuccess } from "../redux/auth/authSlice";
import {
  useDeleteOperationByIdMutation,
  useGetOperationByIdQuery,
  useGetOperationsQuery,
} from "../redux/api/operationApiSlice";

export const TransactionById: React.FC<IPopUp> = ({ onClose }) => {
  const dispatch = useDispatch();
  const activeCard = useSelector(selectActiveCard);
  const { data = [], isLoading } = useGetOperationByIdQuery(activeCard);
  const { id, name, sum, category, createdAt } = data;
  const [deleteCardById] = useDeleteOperationByIdMutation(id);
  const { refetch } = useGetOperationsQuery({});

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
              <h3>Operation name:</h3>
              <span>{name}</span>
            </div>
            <div className="card-info-item">
              <h3>Operation sum:</h3>
              <span>{sum}</span>
            </div>
            <div className="card-info-item">
              <h3>Operation category:</h3>
              <span>{category}</span>
            </div>
            <div className="card-info-item">
              <h3>Operation date:</h3>
              <span>{createdAt}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
