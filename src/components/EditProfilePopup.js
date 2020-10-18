import React, { useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { validateLength } from './../utils/utils';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const inputs = [
    {
      name: 'name',
      type: 'text',
      autoComplete: 'off',
      placeholder: 'Имя',
      required: true,
      minLength: 2,
      maxLength: 30,
      pattern: '[A-Za-zА-Яа-яЁё\\s\\-]{1,}',
      extra: { extraValidator: validateLength },
    },
    {
      name: 'about',
      type: 'text',
      autoComplete: 'off',
      placeholder: 'О себе',
      required: true,
      minLength: 2,
      maxLength: 30,
      extra: { extraValidator: validateLength },
    },
  ];

  const form = {
    name: 'profile',
    title: 'Редактировать профиль',
    initialState: {
      values: { name: currentUser.name, about: currentUser.about },
      errors: {},
      valid: currentUser.name && currentUser.about,
    },
    inputs: inputs,
    reset: !isOpen,
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      form={form}
      onSubmit={onUpdateUser}
    />
  );
}

export default EditProfilePopup;
