import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import logo from '../images/logo/mesto.svg';

import Menu from './Menu';

import CurrentUserContext from '../contexts/CurrentUserContext';

const Header = React.memo(({ showTopMenu, onShowMenu, onHideMenu }) => {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <header className="header page__header unit page__unit">
      {showTopMenu !== undefined && (
        <div className="header__menu header__menu_place_top">
          <Menu isDefault={false} email={currentUser.name} />{' '}
        </div>
      )}
      <div className="container header__container">
        <div className="logo header__logo">
          <img src={logo} alt="Логотип Mesto Russia" className="logo__image" />
        </div>
        <Switch>
          <Route path="/sign-up">
            <Link
              to="/sign-in"
              className="header__link header__menu-item header__menu-item_scalable"
            >
              Войти
            </Link>
          </Route>
          <Route path="/sign-in">
            <Link
              to="/sign-up"
              className="header__link header__menu-item header__menu-item_scalable"
            >
              Регистрация
            </Link>
          </Route>
          <Route exact path="/">
            {currentUser.name ? (
              <div className="header__menu">
                <Menu email={currentUser.name} />
                <button
                  className={`header__menu-button header__button header__menu-button_type_open${
                    showTopMenu ? ' header__menu-button_invisible' : ''
                  }`}
                  onClick={onShowMenu}
                />
                <button
                  className={`header__menu-button header__button header__menu-button_type_close${
                    !showTopMenu ? ' header__menu-button_invisible' : ''
                  }`}
                  onClick={onHideMenu}
                />
              </div>
            ) : (
              ''
            )}
          </Route>
        </Switch>
      </div>
    </header>
  );
});

export default Header;
