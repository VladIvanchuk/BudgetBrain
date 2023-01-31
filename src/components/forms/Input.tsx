import { UseFormRegisterReturn } from "react-hook-form";

export const Input: React.FC<IPropTypes> = (props) => {
  const input = (
    <input type={props.type} placeholder={props.placeholder} {...props.register} />
  );

  return (
    <div className="form-div">
      <label className="form-tag">{props.label}</label>
      <span className="error-message">{props.error?.message}</span>
      {input}
    </div>
  );
};
interface IPropTypes {
  label: string;
  name?: string;
  placeholder?: string;
  type?: string;
  register: UseFormRegisterReturn;
  error?: {
    message?: string;
  };
}
