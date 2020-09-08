import React, { useContext } from 'react';
import Landing from './Landing';
import MainPage from './MainPage';
import authContext from '../context/auth/authContext';

const HomePage = () => {
  const { isLoggedIn } = useContext(authContext);

  if (!isLoggedIn) return <Landing />;
  else return <MainPage />;
};

export default HomePage;
