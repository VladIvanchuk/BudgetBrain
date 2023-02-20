import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useGetCardsQuery } from "../../../redux/api/cardApiSlice";
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
  const [selectedCategory, setSelectedCategory] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedCard, setSelectedCard] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const { data = [] } = useGetCardsQuery({});
  const dispatch = useDispatch();

  const cards = data?.map((card: ICard) => ({
    value: card.id,
    label: card.cardName,
  }));

  const handleCategoryChange = useCallback(
    (selectedOption: { value: string; label: string }) => {
      setSelectedCategory(selectedOption);
    },
    []
  );
  const handleCardChange = useCallback(
    (selectedOption: { value: string; label: string }) => {
      setSelectedCard(selectedOption);
    },
    []
  );

  const form = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    data.category = selectedCategory && selectedCategory.value;
    data.card = selectedCard && selectedCard.value;
    data.type = selectedType;
    try {
      console.log(data);
      dispatch((setSuccess as any)("Operation added"));
      onClose();
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
          error={form.formState.errors.name}
          register={form.register("name")}
        />
        <Input
          label="Sum"
          type="number"
          class="popup-item"
          placeholder="0$"
          error={form.formState.errors.sum}
          register={form.register("sum")}
        />
      </div>
      <Input
        label="Date"
        type="date"
        class="popup-item"
        error={form.formState.errors.date}
        register={form.register("date")}
      />
      <Input
        label="Category"
        type="text"
        class="popup-item category"
        creatableSelect
        description="You can create your own categories, just type it"
        options={selectedType === "expenses" ? expensesCategory : incomeCategory}
        onChange={handleCategoryChange}
      />
      <Input
        label="Card"
        type="text"
        class="popup-item category select-cards"
        select
        options={cards}
        onChange={handleCardChange}
      />
      <button className="btn log" type="submit">
        <span>Add</span>
      </button>
      <button className="back" onClick={() => setSelectedType("")}>
        <span>&#10140;</span>Back
      </button>
    </form>
  );
};
