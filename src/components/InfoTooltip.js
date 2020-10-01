import React from 'react';
import Popup from './Popup';

import succesIcon from '../images/tooltip/success.svg';
import failureIcon from '../images/tooltip/failure.svg';

const InfoTooltip = React.memo(({ onClose, isOpen, isSuccess }) => {
  return (
    <Popup
      onClose={onClose}
      isOpen={isOpen}
      extraClasses={{
        container: 'popup__container_solid popup__container_for_tooltip',
        button: 'popup__close-button_for_tooltip',
      }}
    >
      <img
        src={isSuccess ? succesIcon : failureIcon}
        className="tooltip__icon"
        alt={isSuccess ? 'ОК' : 'Неудача'}
      />
      <p className="tooltip__text">
        {isSuccess
          ? 'Вы успешно зарегистрировались!'
          : 'Что-то пошло не так! Попробуйте ещё раз.'}
      </p>
    </Popup>
  );
});

export default InfoTooltip;
