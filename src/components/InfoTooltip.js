import React, { memo } from 'react';
import Popup from './Popup';

const InfoTooltip = memo(({ onClose, isOpen, icon, alt, text }) => {
  return (
    <Popup
      onClose={onClose}
      isOpen={isOpen}
      extraClasses={{
        container: 'popup__container_solid popup__container_for_tooltip',
        button: 'popup__close-button_for_tooltip',
      }}
    >
      {icon && <img src={icon} className="tooltip__icon" alt={alt || ''} />}
      <p className="tooltip__text">{text || ''}</p>
    </Popup>
  );
});

export default InfoTooltip;
