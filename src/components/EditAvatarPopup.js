import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { useFormWithValidation } from './../hooks/useForm';
import { errorsDictionaries } from './../utils/constants';
import InputError from './InputError';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, showLoader }) {
  const input = React.useRef(null);
  const currentUser = React.useContext(CurrentUserContext);
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  } = useFormWithValidation({
    default: errorsDictionaries.default,
  });

  React.useEffect(() => {
    if (!showLoader && isOpen && currentUser) {
      resetForm({ avatar: currentUser.avatar }, {}, true);
      input.current.focus();
    }
  }, [isOpen, resetForm, currentUser, showLoader]);
  function handleSubmit() {
    onUpdateAvatar(values.avatar);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      showLoader={showLoader}
      isDisabled={!isValid}
    >
      <label className="form__field">
        <input
          type="url"
          name="avatar"
          ref={input}
          className={`form__input${
            errors.avatar ? ' form__input_invalid' : ''
          }`}
          autoComplete="off"
          placeholder="Ссылка на аватар"
          required
          onChange={handleChange}
          value={values.avatar || ''}
        />
        <InputError text={errors.avatar || ''} />
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
