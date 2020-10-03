import React, { memo } from 'react';
import Popup from './Popup';

const InfoTooltip = memo(({ onClose, isOpen, status = {} }) => {
  return (
    <Popup
      onClose={onClose}
      isOpen={isOpen}
      extraClasses={{
        container: 'popup__container_solid popup__container_for_tooltip',
        button: 'popup__close-button_for_tooltip',
      }}
    >
      {status.icon && (
        <img
          src={status.icon}
          className="tooltip__icon"
          alt={status.alt || ''}
        />
      )}
      <p className="tooltip__text">{status.text || ''}</p>
    </Popup>
  );
});

export default InfoTooltip;
