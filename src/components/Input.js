import React from 'react';

const Input = React.memo(
  ({ props, error, value, onChange, extraClasses = {} }) => {
    return (
      <label className={`form__field ${extraClasses.label || ''}`}>
        <input
          {...props}
          className={`form__input${error ? ' form__input_invalid' : ''} ${
            extraClasses.input || ''
          }`}
          onChange={onChange}
          value={value || ''}
        />
        <span
          className={`form__input-error${
            error ? ' form__input-error_visible' : ''
          } ${extraClasses.span || ''}`}
        >
          {error || ''}
        </span>
      </label>
    );
  }
);

export default Input;
