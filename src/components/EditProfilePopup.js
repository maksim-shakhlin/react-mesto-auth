import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { useFormWithValidation } from './../hooks/useForm';
import { errorsDictionaries } from './../utils/constants';
import { validateLength } from './../utils/utils';
import InputError from './InputError';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, showLoader }) {
  const input = React.useRef(null);
  const currentUser = React.useContext(CurrentUserContext);
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  } = useFormWithValidation(
    {
      ...errorsDictionaries.userProfile,
      default: errorsDictionaries.default,
    },
    validateLength
  );

  React.useEffect(() => {
    if (!showLoader && isOpen && currentUser) {
      resetForm(currentUser, {}, true);
      input.current.focus();
    }
  }, [currentUser, resetForm, isOpen, showLoader]);

  function handleSubmit() {
    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      showLoader={showLoader}
      isDisabled={!isValid}
    >
      <label className="form__field">
        <input
          type="text"
          name="name"
          ref={input}
          className={`form__input${errors.name ? ' form__input_invalid' : ''}`}
          autoComplete="off"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          pattern="[A-Za-zА-Яа-яЁё\s\-]{1,}"
          onChange={handleChange}
          value={values.name || ''}
        />
        <InputError text={errors.name || ''} />
      </label>
      <label className="form__field">
        <input
          type="text"
          name="about"
          className={`form__input${errors.about ? ' form__input_invalid' : ''}`}
          autoComplete="off"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
          onChange={handleChange}
          value={values.about || ''}
        />
        <InputError text={errors.about || ''} />
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
