import React, { ChangeEvent, useState } from 'react';

interface IProps {
  value?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

const Toggle: React.FC<IProps> = ({ className = '', checked = false, value, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);

    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <label className={`${className} toggle ${isChecked ? 'active' : ''}`}>
      <input
        value={value}
        className="toggle__input"
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
      />
      <div className="toggle__button"></div>
    </label>
  );
};

export default Toggle;
