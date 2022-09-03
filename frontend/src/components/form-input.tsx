import { ChangeEvent, HTMLInputTypeAttribute } from 'react';

interface Props {
  className?: string;
  name: string;
  value?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  icon?: JSX.Element;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<Props> = ({
  className = '',
  placeholder,
  icon,
  name,
  onChange,
  onBlur,
  value = '',
  type = 'text',
}) => {
  return (
    <div className={`form-input ${className}`}>
      {icon && icon}
      <input
        type={type}
        name={name}
        className={`form-input__input`}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
    </div>
  );
};

export default FormInput;
