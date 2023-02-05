import { UseFormRegisterReturn } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";

export const Input: React.FC<IPropTypes> = (props) => {
  const input = (
    <input
      min="0"
      type={props.type}
      placeholder={props.placeholder}
      {...props.register}
    />
  );
  const creatableSelect = (
    <CreatableSelect
      className="select"
      options={props.options}
      value={props.value}
      onChange={props.onChange}
      classNamePrefix="react-select"
    />
  );
  const select = (
    <Select
      className="select"
      options={props.options}
      value={props.value}
      onChange={props.onChange}
      classNamePrefix="react-select"
    />
  );
  return (
    <div className={"form-div " + props.class}>
      <label className="form-tag">{props.label}</label>
      <span className="error-message">{props.error?.message}</span>
      {props.select && select}
      {props.creatableSelect && creatableSelect}
      {!props.select && !props.creatableSelect && input}
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
  creatableSelect?: boolean;
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
  onChange?: (value: any) => void;
}
