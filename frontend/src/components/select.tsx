import React, { ChangeEvent } from 'react';

interface IBaseProps {
  children: React.ReactNode;
}

interface ISelectProps extends IBaseProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}
interface IOptionProps extends IBaseProps {
  value: string;
}

type OptionComponent<T> = React.FunctionComponent<T>;
type SelectComponent<T, Y> = React.FunctionComponent<T> & {
  Option: OptionComponent<Y>;
};

const Select: SelectComponent<ISelectProps, IOptionProps> = ({ value, onChange, children }) => {
  return (
    <select value={value || ''} className="select" onChange={onChange}>
      {children}
    </select>
  );
};

const Option: OptionComponent<IOptionProps> = ({ value, children }) => {
  return (
    <option className="select__option" value={value}>
      {children}
    </option>
  );
};

Select.Option = Option;

export default Select;
export { Option };
