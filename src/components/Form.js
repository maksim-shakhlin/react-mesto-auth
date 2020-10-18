import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Input from './Input';
import Loader from './Loader';
import { useFormWithValidation } from './../hooks/useForm';
import { errorsDictionaries } from './../utils/constants';
import { omit } from './../utils/utils';

function Form({
  name,
  title,
  onSubmit,
  action,
  loaderAction,
  inputs,
  initialState,
  extraClasses,
  reset,
  setFocus,
  resetDelay,
  showLoader,
}) {
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
      if (['text', 'url', 'tel', 'search'].includes(firstInput.current.type)) {
        firstInput.current.selectionStart = firstInput.current.value.length;
        firstInput.current.selectionEnd = firstInput.current.value.length;
      }
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
      className={classNames('form', extraClasses.form)}
      name={name}
      noValidate
      onSubmit={handleSubmit}
    >
      {!inputs ? (
        <h2 className={classNames('form__title', extraClasses.title)}>
          {title}
        </h2>
      ) : (
        <fieldset className={classNames('form__fields', extraClasses.fieldset)}>
          <legend className={classNames('form__title', extraClasses.title)}>
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
        className={classNames('form__button', extraClasses.button, {
          form__button_disabled: !isValid,
        })}
        disabled={!isValid || showLoader}
      >
        {(showLoader && loaderAction) || action}
        {showLoader && <Loader />}
      </button>
    </form>
  );
}
Form.defaultProps = {
  action: 'Сохранить',
  loaderAction: 'Сохранение',
  reset: false,
  setFocus: true,
  resetDelay: 0,
  showLoader: false,
  initialState: {
    values: undefined,
    errors: undefined,
    valid: true,
  },
  extraClasses: {},
};

Form.propTypes = {
  extraClasses: PropTypes.objectOf(PropTypes.string),
};

export default Form;
