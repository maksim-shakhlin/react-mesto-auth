import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, showLoader }) {
  const currentUser = React.useContext(CurrentUserContext);
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
    onSubmit: onUpdateAvatar,
    showLoader: showLoader,
    initialState: { values: currentUser, errors: {}, valid: true },
    inputs: inputs,
  };

  return <PopupWithForm isOpen={isOpen} onClose={onClose} form={form} />;
}

export default EditAvatarPopup;
