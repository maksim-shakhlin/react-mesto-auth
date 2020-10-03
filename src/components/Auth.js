import React from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

function Auth({
  onSubmit,
  showLoader,
  link,
  linkText,
  title,
  action,
  loaderAction,
  autoComplete = 'off',
}) {
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
        name="login"
        title={title}
        onSubmit={onSubmit}
        action={action}
        loaderAction={loaderAction}
        inputs={inputs}
        extraClasses={extraClasses}
        showLoader={showLoader}
      />
      <p className="content__tagline">
        Еще не зарегестрированы?&nbsp;
        <Link to={link} className="content__link">
          {linkText}
        </Link>
      </p>
    </main>
  );
}

export default Auth;
