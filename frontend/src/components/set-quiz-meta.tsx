import React, { ChangeEvent, useEffect, useState } from 'react';
import Wrapper from './wrapper';
import FormInput from './form-input';
import { RiCloseFill as ClearInputIcon } from 'react-icons/ri';

interface IResponse {
  title: string;
  description: string;
}

interface IProps {
  className?: string;
  onChange?: (data: IResponse) => void;
}

const SetQuizMeta: React.FC<IProps> = ({ className, onChange }) => {
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitleValue(e.target.value);
  const handleClearTitle = () => setTitleValue('');

  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) =>
    setDescriptionValue(e.target.value);

  const handleDescription = () => setDescriptionValue('');

  useEffect(() => {
    if (onChange) {
      onChange({ title: titleValue, description: descriptionValue });
    }
  }, [titleValue, descriptionValue]);

  return (
    <Wrapper className={`${className || ''} set-meta-wrapper`}>
      <div className="set-meta">
        <FormInput
          className="set-meta__input"
          type="text"
          name="quiz-title"
          onChange={handleChangeTitle}
          placeholder={'Title'}
          value={titleValue}
        />
        <ClearInputIcon className="set-meta__clear-icon" onClick={handleClearTitle} />
      </div>
      <div className="set-meta">
        <FormInput
          className="set-meta__input"
          type="text"
          name="quiz-description"
          onChange={handleChangeDescription}
          placeholder={'Description'}
          value={descriptionValue}
        />
        <ClearInputIcon className="set-meta__clear-icon" onClick={handleDescription} />
      </div>
    </Wrapper>
  );
};

export default SetQuizMeta;
