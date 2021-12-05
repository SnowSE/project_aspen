import { useState, FocusEvent } from "react";

export interface InputControl {
  name: string,
  error: string,
  value: string,
  isValid: boolean,
  hasError: boolean,
  valueChangeHandler: (event: FocusEvent<HTMLInputElement>) => void,
  inputBlurHandler: (event: FocusEvent<HTMLInputElement>) => void,
  reset: () => void,
}

const useInput = (
  inputName: string,
  errorMessage: string,
  validateValue?: (value: string) => boolean,
  initialValue?: string
): InputControl => {
  const [enteredValue, setEnteredValue] = useState(initialValue ?? "");
  const [isTouched, setIsTouched] = useState(false);
  let valueIsValid: boolean;

  if (validateValue == null)
  {
    valueIsValid = true;
  } else
  {
    valueIsValid = validateValue(enteredValue);
  }

  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event: FocusEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    name: inputName,
    error: errorMessage,
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;