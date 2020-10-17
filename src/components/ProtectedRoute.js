import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
  component: Component,
  path,
  condition,
  redirect,
  ...props
}) => {
  return (
    <Route path={path}>
      {condition ? <Component {...props} /> : <Redirect to={redirect} />}
    </Route>
  );
};

ProtectedRoute.defaultProps = {
  redirect: '/sign-in',
};

export default ProtectedRoute;
