import React, { useState, useContext } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import classNames from 'classnames';

import CurrentUserContext from '../contexts/CurrentUserContext';

import logo from '../images/logo/mesto.svg';

import Menu from './Menu';
import { menuStateEnum, userStateEnum } from '../utils/constants';

const Header = ({ onLogout }) => {
  const [menuState, setMenuState] = useState(menuStateEnum.UNSET);
  const currentUser = useContext(CurrentUserContext);
  function handleShowMenu() {
    setMenuState(menuStateEnum.SHOWN);
  }

  function handleHideMenu() {
    setMenuState(menuStateEnum.HIDDEN);
  }

  function handleLogout() {
    setMenuState(menuStateEnum.UNSET);
    onLogout();
  }

  return ![userStateEnum.ERROR, userStateEnum.UNSET].includes(currentUser) ? (
    <header className="header page__header unit page__unit">
      {menuState !== menuStateEnum.UNSET && (
        <div
          className={classNames(
            'header__menu header__menu_place_top',
            { 'rolling-down': menuState === menuStateEnum.SHOWN },
            {
              'header__menu_rolled_up rolling-up':
                menuState === menuStateEnum.HIDDEN,
            }
          )}
        >
          <Menu
            isDefault={false}
            onLogout={handleLogout}
            menuState={menuState}
          />{' '}
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
            <div className="header__menu">
              <Menu onLogout={handleLogout} />
              <button
                className={classNames(
                  'header__button header__button_type_open',
                  {
                    header__button_invisible: menuState === menuStateEnum.SHOWN,
                  }
                )}
                onClick={handleShowMenu}
              />
              <button
                className={classNames(
                  'header__button header__button_type_close',
                  {
                    header__button_invisible: menuState !== menuStateEnum.SHOWN,
                  }
                )}
                onClick={handleHideMenu}
              />
            </div>
          </Route>
        </Switch>
      </div>
    </header>
  ) : (
    ''
  );
};

export default Header;
