import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Input({ props, error, value, onChange, extraClasses }) {
  return (
    <label className={classNames('form__field', extraClasses.label)}>
      <input
        {...props}
        className={classNames('form__input', extraClasses.input, {
          form__input_invalid: error,
        })}
        onChange={onChange}
        value={value || ''}
      />
      <span
        className={classNames('form__input-error', extraClasses.span, {
          'form__input-error_visible': error,
        })}
      >
        {error || ''}
      </span>
    </label>
  );
}

Input.defaultProps = {
  extraClasses: {},
};

Input.propTypes = {
  extraClasses: PropTypes.objectOf(PropTypes.string),
};

export default Input;
