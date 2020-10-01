import React from 'react';
import Popup from './Popup';
import Form from './Form';
import { delay } from './../utils/constants';

function PopupWithForm({ isOpen, onClose, form }) {
  form.setFocus = isOpen;
  form.resetDelay = delay;
  form.reset = !isOpen;

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
