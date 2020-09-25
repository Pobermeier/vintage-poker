import React from 'react';
import AuthContext from './authContext';
import useAuth from '../../hooks/useAuth';

const AuthProvider = ({ children }) => {
  const [isLoggedIn, login, logout, register, loadUser] = useAuth();

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, register, loadUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
