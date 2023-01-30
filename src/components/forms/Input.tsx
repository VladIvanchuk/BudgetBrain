export const Input: React.FC<IPropTypes> = ({
  label,
  type,
  placeholder,
  value,
  required,
  onChange,
}) => {
  const input = (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      required={required}
      autoComplete="off"
      onChange={onChange}
    />
  );

  return (
    <div className="form-div">
      <label className="form-tag">{label}</label>
      {input}
    </div>
  );
};
interface IPropTypes {
  label: string;
  placeholder: string;
  type: string;
  value?: string;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
