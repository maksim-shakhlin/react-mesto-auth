import React from 'react';
import logo from '../images/logo/mesto.svg';

const Header = React.memo(() => {
  return (
    <header className='header page__header unit page__unit'>
      <div className='logo header__logo'>
        <img src={logo} alt='Логотип Mesto Russia' className='logo__image' />
      </div>
    </header>
  );
});

export default Header;
