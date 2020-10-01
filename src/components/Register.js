import React from 'react';
import Auth from './Auth';

function Register({ onRegister, showLoader }) {
  return (
    <Auth
      showLoader={showLoader}
      onSubmit={onRegister}
      title="Вход"
      action="Зарегистрироваться"
      loaderAction="Регистрация"
      link="/sign-in"
      linkText="Войти"
    />
  );
}

export default Register;
