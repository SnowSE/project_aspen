import { useState } from 'react';

const useInput = (inputName, errorMessage, validateValue) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  let valueIsValid

  if(validateValue == null)
  {
    valueIsValid = true
  }
  else
  {
    valueIsValid = validateValue(enteredValue);
  }

  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
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
    reset
  };
};

export default useInput;