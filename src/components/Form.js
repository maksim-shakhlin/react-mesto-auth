import React, { memo, useEffect, useRef, useCallback } from 'react';

import Input from './Input';
import Loader from './Loader';
import { useFormWithValidation } from './../hooks/useForm';
import { errorsDictionaries } from './../utils/constants';
import { omit } from './../utils/utils';

const Form = memo(
  ({
    name,
    title,
    onSubmit,
    action = 'Сохранить',
    loaderAction = 'Сохранение',
    inputs,
    initialState = {
      values: undefined,
      errors: undefined,
      valid: true,
    },
    extraClasses = {},
    reset = false,
    setFocus = true,
    resetDelay = 0,
    showLoader = false,
  }) => {
    const extraValidators = {};
    if (inputs) {
      inputs.forEach((input) => {
        if (input.extra) {
          extraValidators[input.name] = input.extra.extraValidator;
        }
      });
    }

    const errorsDict = {
      ...errorsDictionaries[name],
      default: errorsDictionaries.default,
    };

    const firstInput = useRef(null);

    if (inputs) {
      inputs[0].ref = firstInput;
    }

    const {
      values,
      handleChange,
      errors,
      isValid,
      resetForm,
    } = useFormWithValidation(errorsDict, extraValidators);

    const _resetForm = useCallback(() => {
      resetForm(initialState.values, initialState.errors, initialState.valid);
    }, [resetForm, initialState]);

    useEffect(() => {
      if (!showLoader && reset) {
        if (resetDelay) {
          setTimeout(() => _resetForm(), resetDelay);
        } else {
          _resetForm();
        }
      }
    }, [resetForm, showLoader, reset, resetDelay, _resetForm]);

    useEffect(() => {
      if (firstInput.current && setFocus) {
        firstInput.current.focus();
      }
    }, [setFocus]);

    function handleSubmit(event) {
      if (showLoader) {
        return;
      }
      event.preventDefault();
      onSubmit(values);
    }

    return (
      <form
        className={`form ${extraClasses.form || ''}`}
        name={name}
        noValidate
        onSubmit={handleSubmit}
      >
        {!inputs ? (
          <h2 className={`form__title ${extraClasses.title || ''}`}>{title}</h2>
        ) : (
          <fieldset className={`form__fields ${extraClasses.fieldset || ''}`}>
            <legend className={`form__title ${extraClasses.title || ''}`}>
              {title}
            </legend>
            {inputs.map((input) => (
              <Input
                key={input.name}
                props={{ ...omit(input, 'extra') }}
                error={errors[input.name]}
                value={values[input.name]}
                onChange={handleChange}
                extraClasses={extraClasses}
              />
            ))}
          </fieldset>
        )}
        <button
          type="submit"
          className={`form__button${
            !isValid ? ' form__button_disabled' : ''
          }  ${extraClasses.button || ''}`}
          disabled={!isValid || showLoader}
        >
          {(showLoader && loaderAction) || action}
          {showLoader && <Loader />}
        </button>
      </form>
    );
  }
);

export default Form;
