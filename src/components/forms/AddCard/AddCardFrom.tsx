import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useCreateCardMutation, useGetCardsQuery } from "../../../redux/api/cardApiSlice";
import { setError, setSuccess } from "../../../redux/auth/authSlice";
import { IPopUp } from "../../../types/popup";
import { Input } from "../Input";
import { schema } from "./config";

const colors = [
  { value: "#000", label: "Black" },
  { value: "#2647ff", label: "Blue" },
  { value: "#ff2626", label: "Red" },
  { value: "#00cb11", label: "Green" },
];

export const AddCardFrom: React.FC<IPopUp> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [createCard, isLoading] = useCreateCardMutation();
  const { refetch } = useGetCardsQuery({});

  const handleColorChange = useCallback(
    (selectedOption: { value: string; label: string }) => {
      setSelectedColor(selectedOption);
    },
    []
  );
  const form = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    data.color = selectedColor && selectedColor.value;
    try {
      await createCard(data as any).unwrap();
      dispatch((setSuccess as any)("Card added"));
      onClose();
      refetch();
    } catch (err: any) {
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
        options={colors}
        select
        class="popup-item"
        register={form.register("color")}
        error={form.formState.errors.color}
        onChange={handleColorChange}
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
