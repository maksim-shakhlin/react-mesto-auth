import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormWithValidation } from './../hooks/useForm';
import { errorsDictionaries } from './../utils/constants';
import { validateLength } from './../utils/utils';
import InputError from './InputError';

function AddPlacePopup({ isOpen, onClose, onAddPlace, showLoader }) {
  const input = React.useRef(null);
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  } = useFormWithValidation(
    {
      ...errorsDictionaries.addPlace,
      default: errorsDictionaries.default,
    },
    validateLength
  );

  React.useEffect(() => {
    if (!showLoader && isOpen) {
      resetForm();
      input.current.focus();
    }
  }, [isOpen, resetForm, showLoader]);

  function handleSubmit() {
    onAddPlace(values);
  }

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      action="Создать"
      loaderAction="Создание"
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
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          value={values.name || ''}
        />
        <InputError text={errors.name || ''} />
      </label>
      <label className="form__field">
        <input
          type="url"
          name="link"
          className={`form__input${errors.link ? ' form__input_invalid' : ''}`}
          autoComplete="off"
          placeholder="Ссылка на картинку"
          required
          onChange={handleChange}
          value={values.link || ''}
        />
        <InputError text={errors.link || ''} />
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
