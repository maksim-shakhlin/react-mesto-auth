import React, { useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentUser = useContext(CurrentUserContext);
  const inputs = [
    {
      name: 'avatar',
      type: 'url',
      autoComplete: 'off',
      placeholder: 'Ссылка на аватар',
      required: true,
    },
  ];

  const form = {
    name: 'avatar',
    title: 'Обновить аватар',

    initialState: {
      values: { avatar: currentUser.avatar },
      errors: {},
      valid: currentUser.avatar,
    },
    inputs: inputs,
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      form={form}
      onSubmit={onUpdateAvatar}
    />
  );
}

export default EditAvatarPopup;
