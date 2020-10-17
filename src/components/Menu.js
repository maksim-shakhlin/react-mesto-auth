import React, { memo } from 'react';
import classNames from 'classnames';

const Menu = memo(({ isDefault, email, onLogout }) => {
  return (
    <>
      <p
        className={classNames(
          'header__menu-item',
          {
            'header__menu-item_place_default header__menu-item_scalable': isDefault,
          },
          { 'header__menu-item_place_top': !isDefault }
        )}
      >
        {email}
      </p>
      <button
        className={classNames(
          'header__menu-item header__menu-item_type_button',
          {
            'header__menu-item_place_default header__menu-item_scalable': isDefault,
          },
          { 'header__menu-item_place_top': !isDefault }
        )}
        onClick={onLogout}
      >
        Выйти
      </button>
    </>
  );
});

Menu.defaultProps = {
  isDefault: true,
};

export default Menu;
