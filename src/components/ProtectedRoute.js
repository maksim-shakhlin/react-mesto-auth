import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Loading from './Loading';
import Sorry from './Sorry';

const ProtectedRoute = ({
  component: Component,
  path,
  value,
  redirect,
  redirectCase,
  loadingCase,
  errorCase,
  shouldRedirect,
  ...props
}) => {
  function getComponent() {
    switch (value) {
      case errorCase:
        return <Sorry />;
      case loadingCase:
        return <Loading />;
      case shouldRedirect && redirectCase:
        return <Redirect to={redirect} />;

      default:
        return <Component {...props} />;
    }
  }

  return <Route path={path}>{getComponent()}</Route>;
};

ProtectedRoute.defaultProps = {
  redirect: '/sign-in',
  redirectCase: null,
  loadingCase: undefined,
  errorCase: false,
  shouldRedirect: true,
};

export default ProtectedRoute;
