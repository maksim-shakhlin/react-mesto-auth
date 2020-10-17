import React, { useState } from 'react';
import Auth from './Auth';

import { status } from '../utils/constants';
import { handleError } from '../utils/utils';

function Login({ onLogin }) {
  const [tooltipStatus, setTooltipStatus] = useState(status.UNSET);
  const [isTooltipOpen, setTooltipOpen] = useState(false);

  function handleLogin(data) {
    return onLogin(data).catch((error) => {
      handleError(error);
      if (error.code === 401) {
        setTooltipStatus(status.NO_USER);
        setTooltipOpen(true);
        throw error;
      }
    });
  }

  function handleCloseTooltip() {
    setTooltipOpen(false);
  }

  return (
    <Auth
      onSubmit={handleLogin}
      title="Вход"
      action="Войти"
      loaderAction="Вход"
      link="/sign-up"
      linkText="Регистрация"
      autoComplete="on"
      tooltipStatus={tooltipStatus}
      isTooltipOpen={isTooltipOpen}
      onTooltipClose={handleCloseTooltip}
      stopLoader={false}
    />
  );
}

export default Login;
