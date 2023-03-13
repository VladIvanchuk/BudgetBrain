import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useGetCardsQuery } from "../../../redux/api/cardApiSlice";
import {
  useCreateOperationMutation,
  useGetCategoriesQuery,
  useGetOperationsQuery,
} from "../../../redux/api/operationApiSlice";
import { useGetUserBalanceQuery } from "../../../redux/api/userApiSlice";
import { setError, setSuccess } from "../../../redux/auth/authSlice";
import { ICard, ICategory, ITransaction } from "../../../types/card";
import { IPopUp } from "../../../types/popup";
import { Input } from "../Input";
import { schema } from "./config";

export const AddTransaction: React.FC<IPopUp> = ({ onClose }) => {
  const [selectedType, setSelectedType] = useState<number>(0);
  const dispatch = useDispatch();
  const { data: categories = [] } = useGetCategoriesQuery(selectedType);
  const { refetch: refetchOperations } = useGetOperationsQuery({});
  const { refetch: refetchCards } = useGetCardsQuery({});
  const { refetch: refetchBalance } = useGetUserBalanceQuery({});
  const [createOperation, isLoading] = useCreateOperationMutation();
  const { data: allCards = [] } = useGetCardsQuery({});

  const categoryOptions = categories.map((category: ICategory) => ({
    value: category.name,
    label: category.name,
  }));
  const cards = allCards.map((card: ICard) => ({
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
      await createOperation(data as ITransaction).unwrap();
      dispatch((setSuccess as any)("Operation added"));
      onClose();
      refetchOperations();
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
  if (!selectedType) {
    return (
      <div className="type">
        <button className="positive" onClick={() => setSelectedType(1)}>
          Income
        </button>
        <button className="negative" onClick={() => setSelectedType(2)}>
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
        options={categoryOptions}
        select
        class="popup-item category"
        register={form.register("categoryName")}
        error={form.formState.errors.categoryName}
      />
      <Input
        label="Card"
        options={cards}
        class="popup-item category select-cards"
        select
        error={form.formState.errors.cardId}
        register={form.register("cardId")}
      />
      <button
        className={isLoading.status === "pending" ? "btn log sending" : "btn log"}
        type="submit"
      >
        <span>Add</span>
      </button>
      <button className="back" onClick={() => setSelectedType(0)}>
        <span>&#10140;</span>Back
      </button>
    </form>
  );
};
