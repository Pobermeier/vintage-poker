import React, { useContext } from 'react';
import Landing from './Landing';
import MainPage from './MainPage';
import authContext from '../context/auth/authContext';

const HomePage = ({ openModal, lang }) => {
  const { isLoggedIn } = useContext(authContext);

  if (!isLoggedIn) return <Landing lang={lang} />;
  else return <MainPage openModal={openModal} lang={lang} />;
};

export default HomePage;
