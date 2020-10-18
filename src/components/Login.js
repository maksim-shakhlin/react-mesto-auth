import React, { useState } from 'react';
import Auth from './Auth';

import { statusEnum } from '../utils/constants';
import { handleError } from '../utils/utils';

function Login({ onLogin }) {
  const [tooltipStatus, setTooltipStatus] = useState(statusEnum.UNSET);
  const [isTooltipOpen, setTooltipOpen] = useState(false);

  function handleLogin(data) {
    return onLogin(data).catch((error) => {
      handleError(error);
      if (error.code === 401) {
        setTooltipStatus(statusEnum.NO_USER);
      } else {
        setTooltipStatus(statusEnum.COMMON_FAIL);
      }
      setTooltipOpen(true);
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
    />
  );
}

export default Login;
