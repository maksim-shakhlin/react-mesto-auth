import React from 'react';
import Popup from './Popup';
import Loader from './Loader';

function PopupWithForm({
  isOpen,
  onClose,
  name,
  title,
  noinputs,
  children,
  action,
  loaderAction,
  onSubmit,
  showLoader = false,
  isDisabled = false,
}) {
  function handleSubmit(event) {
    if (showLoader) {
      return;
    }
    event.preventDefault();
    onSubmit();
  }

  return (
    <Popup
      isOpen={isOpen}
      containerExtraClasses="popup__container_for_form"
      onClose={onClose}
    >
      <form className="form" name={name} noValidate onSubmit={handleSubmit}>
        {noinputs ? (
          <h2 className="form__title">{title}</h2>
        ) : (
          <fieldset className="form__fields">
            <legend className="form__title">{title}</legend>
            {children}
          </fieldset>
        )}
        <button
          type="submit"
          className={`form__button${
            isDisabled ? ' form__button_disabled' : ''
          }`}
          disabled={isDisabled || showLoader}
        >
          {(showLoader && (loaderAction || 'Сохранение')) ||
            action ||
            'Сохранить'}
          {showLoader && <Loader />}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
