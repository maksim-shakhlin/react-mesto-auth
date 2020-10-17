import { useState } from 'react';

export function usePopup() {
  const [isOpen, setIsOpen] = useState(false);

  function close() {
    setIsOpen(false);
  }

  function open() {
    setIsOpen(true);
  }

  return { isOpen, close, open };
}
