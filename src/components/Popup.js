import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Popup({ isOpen, children, extraClasses, onClose, domNode }) {
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

  return createPortal(
    <section
      className={classNames('popup', { popup_opened: isOpen })}
      onMouseDown={closeOnOverlayClick}
    >
      <div className={classNames('popup__container', extraClasses.container)}>
        {children}
        <button
          type="button"
          className={classNames('popup__close-button', extraClasses.button)}
          onClick={onClose}
        />
      </div>
    </section>,
    domNode
  );
}

Popup.defaultProps = {
  extraClasses: {},
  domNode: document.getElementById('modal'),
};

Popup.propTypes = {
  extraClasses: PropTypes.objectOf(PropTypes.string),
};

export default Popup;
