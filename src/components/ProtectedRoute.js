import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';

const ProtectedRoute = ({ component: Component, path, ...props }) => {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <Route path={path}>
      {() =>
        currentUser ? <Component {...props} /> : <Redirect to="/sign-in" />
      }
    </Route>
  );
};

export default ProtectedRoute;
