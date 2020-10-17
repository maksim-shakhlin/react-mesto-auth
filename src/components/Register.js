import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Auth from './Auth';

import { status } from '../utils/constants';
import { handleError } from '../utils/utils';
import auth from '../utils/auth';

function Register() {
  const [tooltipStatus, setTooltipStatus] = useState(status.UNSET);
  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const history = useHistory();

  function handleRegister(data) {
    return auth
      .register(data)
      .then(() => {
        setTooltipStatus(status.REGISTERED);
        setTooltipOpen(true);
      })
      .catch((error) => {
        handleError(error);
        setTooltipStatus(status.REGISTRATION_FAIL);
        setTooltipOpen(true);
      });
  }

  function handleCloseTooltip() {
    if (tooltipStatus === status.REGISTERED) {
      history.push('/sign-in');
    }
    setTooltipOpen(false);
  }

  return (
    <Auth
      onSubmit={handleRegister}
      title="Регистрация"
      action="Зарегистрироваться"
      loaderAction="Регистрация"
      link="/sign-in"
      linkText="Войти"
      tooltipStatus={tooltipStatus}
      isTooltipOpen={isTooltipOpen}
      onTooltipClose={handleCloseTooltip}
    />
  );
}

export default Register;
