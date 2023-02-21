import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useGetCardsQuery } from "../../../redux/api/cardApiSlice";
import {
  useCreateOperationMutation,
  useGetOperationCategoriesQuery,
  useGetOperationsQuery,
} from "../../../redux/api/operationApiSlice";
import { setError, setSuccess } from "../../../redux/auth/authSlice";
import { ICard } from "../../../types/card";
import { IPopUp } from "../../../types/popup";
import { Input } from "../Input";
import { schema } from "./config";

const incomeCategory = [
  { value: "salary", label: "Salary" },
  { value: "remittance", label: "Remittance" },
  { value: "investment", label: "Investment" },
  { value: "gift", label: "Gift" },
  { value: "deposit", label: "Deposit" },
  { value: "other", label: "Other" },
];
const expensesCategory = [
  { value: "remittance", label: "Remittance" },
  { value: "investment", label: "Investment" },
  { value: "transport", label: "Transport" },
  { value: "leisure", label: "Leisure" },
  { value: "sport", label: "Sport and Health" },
  { value: "gift", label: "Gift" },
  { value: "shopping", label: "Shopping" },
  { value: "food", label: "Food and drinks" },
  { value: "education", label: "Education" },
  { value: "Internet", label: "Internet and communication" },
  { value: "housing", label: "Housing fee" },
  { value: "utility", label: "Utility payments" },
  { value: "other", label: "Other" },
];

export const AddTransaction: React.FC<IPopUp> = ({ onClose }) => {
  const [selectedType, setSelectedType] = useState("");
  const dispatch = useDispatch();
  const { data: allCards = [] } = useGetCardsQuery({});
  const [createOperation, isLoading] = useCreateOperationMutation();
  const { data = [] } = useGetOperationCategoriesQuery({});
  const { refetch } = useGetOperationsQuery({});

  const cards = allCards?.map((card: ICard) => ({
    value: card.id,
    label: card.cardName,
  }));

  const form = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    data.type = selectedType;
    try {
      console.log(data);
      await createOperation(data as any).unwrap();
      dispatch((setSuccess as any)("Operation added"));
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
  if (!selectedType) {
    return (
      <div className="type">
        <button className="positive" onClick={() => setSelectedType("1")}>
          Income
        </button>
        <button className="negative" onClick={() => setSelectedType("2")}>
          Expenses
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="popup-form">
      <div className="div">
        <Input
          label="Name"
          type="text"
          class="popup-item"
          placeholder="Taxi"
          register={form.register("name")}
          error={form.formState.errors.name}
        />
        <Input
          label="Sum"
          type="number"
          class="popup-item"
          placeholder="0$"
          register={form.register("sum")}
          error={form.formState.errors.sum}
        />
      </div>
      <Input
        label="Date"
        type="date"
        class="popup-item"
        error={form.formState.errors.createdAt}
        register={form.register("createdAt")}
      />
      <Input
        label="Category"
        options={selectedType === "expenses" ? expensesCategory : incomeCategory}
        select
        class="popup-item category"
        register={form.register("category")}
        error={form.formState.errors.category}
      />
      <Input
        label="Card"
        options={cards}
        class="popup-item category select-cards"
        select
        error={form.formState.errors.card}
        register={form.register("card")}
      />
      <button
        className={isLoading.status === "pending" ? "btn log sending" : "btn log"}
        type="submit"
      >
        <span>Add</span>
      </button>
      <button className="back" onClick={() => setSelectedType("")}>
        <span>&#10140;</span>Back
      </button>
    </form>
  );
};
