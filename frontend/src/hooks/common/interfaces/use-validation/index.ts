interface ICondition {
  value: boolean;
  errorMessage?: string;
}

export interface IUseValidation {
  isEmpty: ICondition;
  minLengthError: ICondition;
  maxLengthError: ICondition;
  emailError: ICondition;
  isValid: boolean;
}

export interface IValidations {
  minLength?: number;
  isEmpty?: boolean;
  maxLength?: number;
  isEmail?: boolean;
  isPassword?: boolean;
}
