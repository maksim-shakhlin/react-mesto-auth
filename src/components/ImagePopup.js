import React from 'react';
import Popup from './Popup';
import errorCard from '../images/card/error-image.svg';

function ImagePopup({ card, isOpen, onClose }) {
  return (
    <Popup
      isOpen={isOpen}
      closeButtonExtraClasses="popup__close-button_far"
      onClose={onClose}
    >
      <figure className="figure">
        <img
          className="figure__image"
          src={card && card.link}
          alt={card && card.name}
          onError={(e) => {
            e.target.onError = null;
            e.target.src = errorCard;
          }}
        />
        <figcaption className="figure__caption">{card && card.name}</figcaption>
      </figure>
    </Popup>
  );
}

export default ImagePopup;
