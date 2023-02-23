import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  useCreateCardMutation,
  useGetCardColorsQuery,
  useGetCardsQuery,
} from "../../../redux/api/cardApiSlice";
import { setError, setSuccess } from "../../../redux/auth/authSlice";
import { IPopUp } from "../../../types/popup";
import { Input } from "../Input";
import { schema } from "./config";

export const AddCardFrom: React.FC<IPopUp> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [createCard, isLoading] = useCreateCardMutation();
  const { data = [] } = useGetCardColorsQuery({});
  const { refetch } = useGetCardsQuery({});

  const form = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      console.log(data);
      await createCard(data as any).unwrap();
      dispatch((setSuccess as any)("Card added"));
      onClose();
      refetch();
    } catch (err: any) {
      console.log(err);
      if (!err?.status) {
        dispatch((setError as any)("No Server Response"));
      } else {
        dispatch((setError as any)(err.data));
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
