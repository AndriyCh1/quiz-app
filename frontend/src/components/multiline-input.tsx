import React, { ChangeEvent } from 'react';

interface IProps {
  className?: string;
  name: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const MultilineInput: React.FC<IProps> = ({
  className = '',
  placeholder,
  name,
  onChange,
  value = '',
}) => {
  return (
    <textarea
      className={`${className} multiline-input`}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default MultilineInput;
