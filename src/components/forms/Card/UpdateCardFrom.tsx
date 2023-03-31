import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  useUpdateCardMutation,
  useGetCardColorsQuery,
  useGetCardsQuery,
  useGetCardByIdQuery,
} from "../../../redux/api/cardApiSlice";
import { useGetUserBalanceQuery } from "../../../redux/api/userApiSlice";
import { setError, setSuccess } from "../../../redux/auth/authSlice";
import { selectActivePopUp } from "../../../redux/popUpSlice";
import { IPopUp } from "../../../types/popup";
import { Input } from "../Input";
import { schema } from "./config";

export const UpdateCardFrom: React.FC<IPopUp> = ({ onClose }) => {
  const dispatch = useDispatch();
  const activeCard = useSelector(selectActivePopUp);
  const { data: card = [] } = useGetCardByIdQuery(activeCard);
  const [updateCard, isLoading] = useUpdateCardMutation(card.id);
  const { data = [] } = useGetCardColorsQuery({});
  const { refetch: refetchCards } = useGetCardsQuery({});
  const { refetch: refetchBalance } = useGetUserBalanceQuery({});

  const form = useForm({
    mode: "onTouched",  
    resolver: yupResolver(schema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await updateCard(data as any).unwrap();
      dispatch((setSuccess as any)("Card added"));
      onClose();
      refetchCards();
      refetchBalance();
    } catch (err: any) {
      if (err.data?.title) {
        dispatch((setError as any)(err.data.title));
      } else {
        dispatch((setError as any)("No Server Response"));
      }
    }
  });
  return (
    <form onSubmit={onSubmit} className="popup-form">
      <Input
        label="Name"
        type="name"
        class="popup-item"
        placeholder="Card name"
        register={form.register("cardName")}
        error={form.formState.errors.cardName}
      />
      <Input
        label="Number"
        type="number"
        class="popup-item"
        placeholder="Card number"
        register={form.register("numberCard")}
        error={form.formState.errors.numberCard}
      />
      <Input
        label="Current balance"
        type="number"
        class="popup-item"
        placeholder="Card balance"
        register={form.register("cardAmount")}
        error={form.formState.errors.cardAmount}
      />
      <Input
        label="Color"
        options={data}
        select
        class="popup-item"
        register={form.register("colorValue")}
        error={form.formState.errors.colorValue}
      />
      <button
        className={isLoading.status === "pending" ? "btn log sending" : "btn log"}
        type="submit"
      >
        <span>Add</span>
      </button>
    </form>
  );
};
