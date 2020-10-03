import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
  component: Component,
  path,
  condition,
  redirect = 'sign-in',
  ...props
}) => {
  return (
    <Route path={path}>
      {() =>
        condition ? <Component {...props} /> : <Redirect to={redirect} />
      }
    </Route>
  );
};

export default ProtectedRoute;
