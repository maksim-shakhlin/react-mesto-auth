import React, { useCallback } from 'react';

function getErrorMessage(input, errorsDict = {}) {
  const validity = input.validity;

  for (const key in validity) {
    if (validity[key]) {
      return (
        (errorsDict[input.name] && errorsDict[input.name][key]) ||
        (errorsDict.default && errorsDict.default[key]) ||
        input.validationMessage
      );
    }
  }
}

function validate(input, validator) {
  if (validator) {
    input.setCustomValidity(validator(input));
  }
  return input.closest('form').checkValidity();
}

export function useFormWithValidation(errorsDict = {}, extraValidator) {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setIsValid(validate(target, extraValidator));
    setErrors({
      ...errors,
      [name]: getErrorMessage(target, errorsDict),
    });
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setIsValid(newIsValid);
      setErrors(newErrors);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}
