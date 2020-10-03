import React, { memo } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import logo from '../images/logo/mesto.svg';

import Menu from './Menu';

const Header = memo(
  ({ showTopMenu, onShowMenu, onHideMenu, onLogout, email }) => {
    return (
      <header className="header page__header unit page__unit">
        {showTopMenu !== undefined && (
          <div className="header__menu header__menu_place_top">
            <Menu isDefault={false} email={email} onLogout={onLogout} />{' '}
          </div>
        )}
        <div className="container header__container">
          <div className="logo header__logo">
            <img
              src={logo}
              alt="Логотип Mesto Russia"
              className="logo__image"
            />
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
              <div className="header__menu">
                <Menu email={email} onLogout={onLogout} />
                <button
                  className={`header__button header__button_type_open${
                    showTopMenu ? ' header__button_invisible' : ''
                  }`}
                  onClick={onShowMenu}
                />
                <button
                  className={`header__button header__button_type_close${
                    !showTopMenu ? ' header__button_invisible' : ''
                  }`}
                  onClick={onHideMenu}
                />
              </div>
            </Route>
          </Switch>
        </div>
      </header>
    );
  }
);

export default Header;
