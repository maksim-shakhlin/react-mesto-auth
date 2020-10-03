import React from 'react';
import Auth from './Auth';

function Login({ onLogin, showLoader }) {
  return (
    <Auth
      showLoader={showLoader}
      onSubmit={onLogin}
      title="Вход"
      action="Войти"
      loaderAction="Вход"
      link="/sign-up"
      linkText="Регистрация"
      autoComplete="on"
    />
  );
}

export default Login;
