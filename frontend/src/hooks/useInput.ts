import { ChangeEvent, useState } from "react";
import {IValidations, IUseValidation} from "./common/interfaces/use-validation";
import useValidation from "./useValidation";

type IUseInput =  {
  value: string;
  isDirty: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement> ) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
} & IUseValidation

const useInput = (
  initialValue: string,
  validations: IValidations
): IUseInput  => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    setIsDirty(true);
  };

  return {
    value,
    isDirty,
    onChange,
    onBlur,
    ...valid,
  };
};

export default useInput;