import React, { useState, useEffect } from 'react';
import LocaContext from './locaContext';
import { withRouter } from 'react-router-dom';

const LocaProvider = ({ location, children }) => {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const lang =
      new URLSearchParams(location.search).get('lang') ||
      localStorage.getItem('lang') ||
      'en';
    setLang(lang);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.setAttribute('lang', lang);
    // eslint-disable-next-line
  }, [lang]);

  return (
    <LocaContext.Provider value={{ lang, setLang }}>
      {children}
    </LocaContext.Provider>
  );
};

export default withRouter(LocaProvider);
