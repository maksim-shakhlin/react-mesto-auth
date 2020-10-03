import React, { memo } from 'react';

const Menu = memo(({ isDefault = true, email, onLogout }) => {
  return (
    <>
      <p
        className={`header__menu-item${
          isDefault
            ? ' header__menu-item_place_default header__menu-item_scalable'
            : ' header__menu-item_place_top'
        }`}
      >
        {email}
      </p>
      <button
        className={`header__menu-item header__menu-item_type_button${
          isDefault
            ? ' header__menu-item_place_default header__menu-item_scalable'
            : ' header__menu-item_place_top'
        }`}
        onClick={onLogout}
      >
        Выйти
      </button>
    </>
  );
});

export default Menu;
