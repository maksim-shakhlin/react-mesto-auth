import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { validateLength } from './../utils/utils';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, showLoader }) {
  const currentUser = React.useContext(CurrentUserContext);

  const inputs = [
    {
      name: 'name',
      type: 'text',
      autoComplete: 'off',
      placeholder: 'Имя',
      required: true,
      minLength: 2,
      maxLength: 40,
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
      maxLength: 200,
      extra: { extraValidator: validateLength },
    },
  ];

  const form = {
    name: 'profile',
    title: 'Редактировать профиль',
    onSubmit: onUpdateUser,
    showLoader: showLoader,
    initialState: { values: currentUser, errors: {}, valid: true },
    inputs: inputs,
    reset: !isOpen,
  };

  return <PopupWithForm isOpen={isOpen} onClose={onClose} form={form} />;
}

export default EditProfilePopup;
