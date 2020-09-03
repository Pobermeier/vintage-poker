import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoggedIn ? <Redirect to="/" /> : <Component {...props} {...rest} />
      }
    />
  );
};

export default ProtectedRoute;
