import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../../context/auth/authContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useContext(authContext);

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
