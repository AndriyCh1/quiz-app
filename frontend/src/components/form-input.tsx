import React, { ChangeEvent, FC, HTMLInputTypeAttribute } from 'react';

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

const FormInput: FC<Props> = ({
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
    <div className={`form-input ${className || ''}`}>
      <div className="form-input__icon">{icon && icon}</div>
      <input
        type={type}
        name={name}
        className={`form-input__input`}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        style={icon ? { paddingLeft: '30px' } : {}}
      />
    </div>
  );
};

export default FormInput;
