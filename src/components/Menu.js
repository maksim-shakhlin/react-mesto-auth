import React from 'react';

const Menu = React.memo(({ isDefault = true, email }) => {
  return email ? (
    <>
      <p
        className={`header__menu-item${
          isDefault
            ? ' header__menu-item_place_default'
            : ' header__menu-item_place_top'
        }`}
      >
        {email}
      </p>
      <button
        className={`header__button header__menu-item${
          isDefault
            ? ' header__menu-item_place_default'
            : ' header__menu-item_place_top'
        }`}
      >
        Выйти
      </button>
    </>
  ) : (
    ''
  );
});

export default Menu;
