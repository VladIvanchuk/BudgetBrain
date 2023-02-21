import { UseFormRegisterReturn } from "react-hook-form";

export const Input: React.FC<IPropTypes> = (props) => {
  const input = (
    <input
      min="0"
      type={props.type}
      placeholder={props.placeholder}
      {...props.register}
    />
  );
  const select = (
    <div className="select">
      <select defaultValue={""} value={props.value} {...props.register}>
        <option value="" disabled hidden>
          Choose value
        </option>
        {props.options?.map((el) => {
          return (
            <option key={el.value} value={el.value}>
              {el.label}
            </option>
          );
        })}
      </select>
    </div>
  );
  return (
    <div className={"form-div " + props.class}>
      <label className="form-tag">{props.label}</label>
      <span className="error-message">{props.error?.message}</span>
      {props.select ? select : input}
      <span className="description">{props?.description}</span>
    </div>
  );
};
interface IPropTypes {
  options?: {
    value: string;
    label: string;
  }[];
  select?: boolean;
  description?: string;
  class?: string;
  label: string;
  name?: string;
  placeholder?: string;
  type?: string;
  register?: UseFormRegisterReturn;
  error?: {
    message?: string;
  };
  value?: any;
}
