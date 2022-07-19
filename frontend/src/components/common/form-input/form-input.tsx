import { ChangeEvent } from "react";
import "./styles.scss";

interface Props {
  name: string;
  value?: string;
  type?: string;
  placeholder?: string;
  icon?: JSX.Element;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<Props> = ({
  placeholder,
  icon,
  name,
  onChange,
  onBlur,
  value = "",
  type = "text",
}) => {
  return (
    <div className="form-input">
      {icon && icon}
      <input
        type={type}
        name={name}
        className="form-input__input"
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
    </div>
  );
};

export default FormInput;
