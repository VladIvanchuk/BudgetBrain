import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
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

  const form = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      console.log(data);
      dispatch((setSuccess as any)("Card added"));
      onClose();
    } catch (err: any) {
      if (!err?.status) {
        dispatch((setError as any)("No Server Response"));
      } else {
        dispatch((setError as any)("Operation Failed"));
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
        error={form.formState.errors.name}
        register={form.register("name")}
      />
      <Input
        label="Number"
        type="number"
        class="popup-item"
        placeholder="Card number"
        error={form.formState.errors.number}
        register={form.register("number")}
      />
      <Input
        label="Current balance"
        type="number"
        class="popup-item"
        placeholder="Card balance"
        error={form.formState.errors.balance}
        register={form.register("balance")}
      />
      <Input
        label="Color"
        options={colors}
        select
        class="popup-item"
        error={form.formState.errors.color}
        register={form.register("color")}
      />
      <button className="btn log" type="submit">
        <span>Add</span>
      </button>
    </form>
  );
};
