import React from 'react';
import Landing from './Landing';
import MainPage from './MainPage';

const HomePage = ({ loggedIn, userName, openModal, lang }) => {
  if (!loggedIn) return <Landing lang={lang} />;
  else
    return <MainPage userName={userName} openModal={openModal} lang={lang} />;
};

export default HomePage;
