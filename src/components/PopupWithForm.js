import React, { useState } from 'react';
import Popup from './Popup';
import Form from './Form';
import { delay } from '../utils/constants';
import { handleError } from '../utils/utils';

function PopupWithForm({ isOpen, onClose, form, onSubmit }) {
  const [showLoader, setShowLoader] = useState(false);

  form.setFocus = isOpen;
  form.resetDelay = delay;
  form.reset = !isOpen;
  form.showLoader = showLoader;

  form.onSubmit = (data) => {
    setShowLoader(true);
    onSubmit(data)
      .then(() => onClose())
      .catch((error) => handleError(error))
      .finally(() => {
        setTimeout(() => {
          setShowLoader(false);
        }, delay);
      });
  };

  return (
    <Popup
      isOpen={isOpen}
      extraClasses={{
        container: 'popup__container_solid popup__container_for_form',
      }}
      onClose={onClose}
    >
      <Form {...form} />
    </Popup>
  );
}

export default PopupWithForm;
