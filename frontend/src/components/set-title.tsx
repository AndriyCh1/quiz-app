import React, { ChangeEvent } from 'react';
import Wrapper from './wrapper';
import FormInput from './form-input';
import { RiCloseFill as ClearInputIcon } from 'react-icons/ri';

interface IProps {
  value?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  className?: string;
}

const SetTitle: React.FC<IProps> = ({ value, placeholder, onChange, onClear, className }) => {
  return (
    <Wrapper className={`${className || ''} set-title-wrapper`}>
      <div className="set-title">
        <FormInput
          className="set-title__input"
          type="text"
          name="quiz-title"
          onChange={onChange}
          placeholder={placeholder}
          value={value}
        />
        <ClearInputIcon className="set-title__clear-icon" onClick={onClear} />
      </div>
    </Wrapper>
  );
};

export default SetTitle;
