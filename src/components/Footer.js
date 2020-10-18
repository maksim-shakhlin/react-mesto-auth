import React, { memo, useContext } from 'react';

import CurrentUserContext from '../contexts/CurrentUserContext';
import { userStateEnum } from '../utils/constants';

const Footer = memo(() => {
  const currentUser = useContext(CurrentUserContext);
  const year = new Date().getFullYear();
  const tag = year - 2020 ? `—${year}` : '';

  return ![userStateEnum.ERROR, userStateEnum.UNSET].includes(currentUser) ? (
    <footer className="footer page__footer unit page__unit container">
      {`© 2020${tag} Mesto Russia`}
    </footer>
  ) : (
    ''
  );
});

export default Footer;
