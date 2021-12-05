import { useState } from 'react';

interface Props {
    label: string
    options: string[]
    error: string
    validator?: Function
}

export interface DropDownControl {
    label: string,
    options: string[],
    value: string,
    isValid: boolean,
    hasError: boolean,
    errorMessage: string,
    valueChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
    inputBlurHandler: () => void,
    reset: () => void,
}

const useDropdown = ({ label, options, validator }: Props) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);
    let valueIsValid

    if (validator)
    {
        valueIsValid = validator(enteredValue)
    }
    else
    {
        valueIsValid = true
    }

    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredValue(event.target.id);
    };

    const inputBlurHandler = () => {
        setIsTouched(true);
    };

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    };

    return {
        label: label,
        options: options,
        value: enteredValue,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset
    };
};

export default useDropdown;