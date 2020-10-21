import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
import InfoTooltip from './InfoTooltip';

import { statuses } from '../utils/constants';

function Auth({
  onSubmit,
  link,
  linkText,
  title,
  action,
  loaderAction,
  autoComplete,
  tooltipStatus,
  isTooltipOpen,
  onTooltipClose,
  stopLoader,
  bottomText,
}) {
  const [showLoader, setShowLoader] = useState(false);

  function handleSubmit(data) {
    setShowLoader(true);
    onSubmit(data)
      .catch((err) => {
        setShowLoader(false);
      })
      .finally(() => {
        if (stopLoader) {
          setShowLoader(false);
        }
      });
  }

  const inputs = [
    {
      name: 'email',
      type: 'email',
      required: true,
      placeholder: 'Email',
      autoComplete: autoComplete,
    },
    {
      name: 'password',
      type: 'password',
      required: true,
      minLength: 6,
      pattern: '[0-9a-zA-Z!@#$%^&*()-_+=;:,./?\\|`~[\\]{}<>"\']{1,}',
      placeholder: 'Пароль',
      autoComplete: autoComplete,
    },
  ];

  const extraClasses = {
    input: 'form__input_theme_dark',
    button: 'form__button_theme_dark form__button_place_content',
    form: 'form_place_content',
    title: 'form__title_place_content',
  };

  return (
    <main className="content page__content unit page__unit container">
      <Form
        name="auth"
        title={title}
        onSubmit={handleSubmit}
        action={action}
        loaderAction={loaderAction}
        inputs={inputs}
        extraClasses={extraClasses}
        showLoader={showLoader}
      />
      <p className="content__tagline">
        {bottomText}&nbsp;
        <Link to={link} className="content__link">
          {linkText}
        </Link>
      </p>
      <InfoTooltip
        onClose={onTooltipClose}
        {...statuses[tooltipStatus]}
        isOpen={isTooltipOpen}
      />
    </main>
  );
}

Auth.defaultProps = {
  autoComplete: 'off',
  stopLoader: true,
};

export default Auth;
