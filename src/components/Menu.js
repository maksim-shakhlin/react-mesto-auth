import React, { memo, useContext } from 'react';
import classNames from 'classnames';
import CurrentUserContext from '../contexts/CurrentUserContext';

const Menu = memo(({ isDefault, onLogout }) => {
  const currentUser = useContext(CurrentUserContext);
  return currentUser ? (
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
        {currentUser.email}
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
  ) : (
    ''
  );
});

Menu.defaultProps = {
  isDefault: true,
};

export default Menu;
