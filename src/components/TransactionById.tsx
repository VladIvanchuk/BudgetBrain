import { useDispatch, useSelector } from "react-redux";
import { removeActivePopUp, selectIsPopUpOpen } from "../redux/popUpSlice";
import { Loader } from "./Loader";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { setError, setSuccess } from "../redux/auth/authSlice";
import {
  useDeleteOperationByIdMutation,
  useGetOperationByIdQuery,
  useGetOperationsQuery,
} from "../redux/api/operationApiSlice";
import { format, parseISO } from "date-fns";

export const TransactionById: React.FC = () => {
  const dispatch = useDispatch();
  const activeCard = useSelector(selectIsPopUpOpen);
  const { data = [], isLoading, isSuccess } = useGetOperationByIdQuery(activeCard);
  const { id, name, sum, category, createdAt, cardName } = data;
  const [deleteCardById] = useDeleteOperationByIdMutation(id);
  const { refetch } = useGetOperationsQuery({});
  const formattedDate = isSuccess && format(parseISO(createdAt), "dd MMMM yyyy");

  const handleDelete = async () => {
    try {
      await deleteCardById(id);
      dispatch((setSuccess as any)("Card deleted"));
      refetch();
      dispatch(removeActivePopUp());
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
              <h3>Name:</h3>
              <span>{name}</span>
            </div>
            <div className="card-info-item">
              <h3>Sum:</h3>
              <span>{sum}</span>
            </div>
            <div className="card-info-item">
              <h3>Category:</h3>
              <span>{category}</span>
            </div>
            <div className="card-info-item">
              <h3>Date:</h3>
              <span>{formattedDate}</span>
            </div>
            <div className="card-info-item">
              <h3>Card:</h3>
              <span>{cardName}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
