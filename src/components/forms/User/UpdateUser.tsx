import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useGetUserQuery, useUpdateUserMutation } from "../../../redux/api/userApiSlice";
import { Input } from "../Input";
import { schema } from "./config";
import { setError, setSuccess } from "../../../redux/auth/authSlice";
import { IPopUp } from "../../../types/popup";

export const UpdateUser: React.FC<IPopUp> = ({ onClose }) => {
  const dispatch = useDispatch();
  const { data = {} } = useGetUserQuery({});
  const { firstName, lastName, email, id } = data;
  const [UPDUser, isLoading] = useUpdateUserMutation(id);

  const form = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await UPDUser(data as any).unwrap();
      dispatch((setSuccess as any)("Card added"));
      onClose();
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
        label="First name"
        type="firstName"
        value={firstName}
        class="popup-item"
        placeholder=""
        register={form.register("firstName")}
        error={form.formState.errors.firstName}
      />
      <Input
        label="Last name"
        type="lastName"
        value={lastName}
        class="popup-item"
        placeholder=""
        register={form.register("lastName")}
        error={form.formState.errors.lastName}
      />
      <Input
        label="Email"
        type="email"
        value={email}
        class="popup-item"
        placeholder=""
        register={form.register("email")}
        error={form.formState.errors.email}
      />
      <Input
        label="Password"
        type="password"
        class="popup-item"
        placeholder=""
        register={form.register("password")}
        error={form.formState.errors.password}
      />
      <Input
        label="Photo"
        type="file"
        class="popup-item file"
        placeholder=""
        register={form.register("photo")}
        error={form.formState.errors.photo}
      />

      <button
        className={isLoading.status === "pending" ? "btn log sending" : "btn log"}
        type="submit"
      >
        <span>Update</span>
      </button>
    </form>
  );
};
