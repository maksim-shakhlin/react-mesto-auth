import React from 'react';

const InputError = React.memo(({ text }) => {
  return (
    <span
      className={`form__input-error${text ? ' form__input-error_visible' : ''}`}
    >
      {text}
    </span>
  );
});

export default InputError;
