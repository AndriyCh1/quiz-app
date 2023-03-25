import { useEffect, useState } from 'react';
import { IValidations, IUseValidation } from './common/interfaces/use-validation';

interface ICondition {
  value: boolean;
  errorMessage?: string;
}

const useValidation = (value: string, validations: IValidations): IUseValidation => {
  const [isEmpty, setIsEmpty] = useState<ICondition>({ value: true });
  const [minLengthError, setMinLengthError] = useState<ICondition>({ value: false });
  const [maxLengthError, setMaxLengthError] = useState<ICondition>({ value: false });
  const [emailError, setEmailError] = useState<ICondition>({ value: false });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          validations?.minLength && value.length < validations.minLength
            ? setMinLengthError({
                value: true,
                errorMessage: `Should have ${validations.minLength} characters at least`,
              })
            : setMinLengthError({ value: false });
          break;
        case 'isEmail':
          const regularExpression =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          regularExpression.test(String(value).toLowerCase())
            ? setEmailError({ value: false })
            : setEmailError({ value: true, errorMessage: 'Email format is not valid' });
          break;
        case 'maxLength':
          validations?.maxLength && value.length > validations.maxLength
            ? setMaxLengthError({
                value: true,
                errorMessage: `Shouldn't have more characters then ${validations.maxLength}`,
              })
            : setMaxLengthError({ value: false });
          break;
        case 'isEmpty':
          value
            ? setIsEmpty({ value: false })
            : setIsEmpty({ value: true, errorMessage: 'Cannot be empty' });
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmpty.value || emailError.value || minLengthError.value || maxLengthError.value)
      setIsValid(false);
    else setIsValid(true);
  }, [isEmpty, emailError, minLengthError, maxLengthError]);

  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    emailError,
    isValid,
  };
};

export default useValidation;
