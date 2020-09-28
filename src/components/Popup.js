import React from 'react';

function Popup({
  isOpen,
  children,
  containerExtraClasses,
  closeButtonExtraClasses,
  onClose,
}) {
  const openedClass = (isOpen && ' popup_opened') || '';
  containerExtraClasses =
    (containerExtraClasses && ' ' + containerExtraClasses) || '';
  closeButtonExtraClasses =
    (closeButtonExtraClasses && ' ' + closeButtonExtraClasses) || '';

  function closeOnEscape(event) {
    if (event.key === 'Escape') {
      onClose();
    }
  }

  function closeOnOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', closeOnEscape);

      return function removeListener() {
        document.removeEventListener('keydown', closeOnEscape);
      };
    }
  });

  return (
    <section
      className={`popup${openedClass}`}
      onMouseDown={closeOnOverlayClick}
    >
      <div className={'popup__container' + containerExtraClasses}>
        {children}
        <button
          type='button'
          className={'popup__close-button' + closeButtonExtraClasses}
          onClick={onClose}
        />
      </div>
    </section>
  );
}

export default Popup;
