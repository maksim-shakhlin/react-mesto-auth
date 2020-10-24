import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Auth from './Auth';

import { statusEnum } from '../utils/constants';
import { handleError } from '../utils/utils';
import api from '../utils/api';
import { cleanData } from '../utils/utils';

function Register() {
  const [tooltipStatus, setTooltipStatus] = useState(statusEnum.UNSET);
  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const history = useHistory();

  function handleRegister(data) {
    return api
      .register(cleanData(data))
      .then(() => {
        setTooltipStatus(statusEnum.REGISTERED);
        setTooltipOpen(true);
      })
      .catch((error) => {
        handleError(error);
        setTooltipStatus(statusEnum.REGISTRATION_FAIL);
        setTooltipOpen(true);
      });
  }

  function handleCloseTooltip() {
    if (tooltipStatus === statusEnum.REGISTERED) {
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
      bottomText="Уже зарегистрированы?"
    />
  );
}

export default Register;
