import React from 'react';
import PopupWithForm from './PopupWithForm';
import { validateLength } from './../utils/utils';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const inputs = [
    {
      name: 'name',
      type: 'text',
      autoComplete: 'off',
      placeholder: 'Название',
      required: true,
      minLength: 2,
      maxLength: 30,
      extra: { extraValidator: validateLength },
    },
    {
      name: 'link',
      type: 'url',
      autoComplete: 'off',
      placeholder: 'Ссылка на картинку',
      required: true,
    },
  ];

  const form = {
    name: 'place',
    title: 'Новое место',
    action: 'Создать',
    loaderAction: 'Создание',
    initialState: { values: {}, errors: {}, valid: false },
    inputs: inputs,
    reset: !isOpen,
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      form={form}
      onSubmit={onAddPlace}
    />
  );
}

export default AddPlacePopup;
