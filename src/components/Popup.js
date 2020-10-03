import React, { memo, useEffect } from 'react';

const Popup = memo(({ isOpen, children, extraClasses = {}, onClose }) => {
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

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', closeOnEscape);

      return function removeListener() {
        document.removeEventListener('keydown', closeOnEscape);
      };
    }
  });

  return (
    <section
      className={`popup${isOpen ? ' popup_opened' : ''}`}
      onMouseDown={closeOnOverlayClick}
    >
      <div className={`popup__container ${extraClasses.container || ''}`}>
        {children}
        <button
          type="button"
          className={`popup__close-button ${extraClasses.button || ''}`}
          onClick={onClose}
        />
      </div>
    </section>
  );
});

export default Popup;
