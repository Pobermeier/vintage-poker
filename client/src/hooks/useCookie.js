import { useState, useEffect } from 'react';

const useCookie = (cookieName, initialState) => {
  const [isCookieSet, setIsCookieSet] = useState(initialState);

  useEffect(() => {
    setIsCookieSet(checkCookies(cookieName));
    // eslint-disable-next-line
  }, []);

  const getCookieValue = () => {
    const allStoredCookies = document.cookie.split('; ');
    const foundCookie = allStoredCookies.filter((cookie) =>
      cookie.split('=').includes(cookieName),
    )[0];
    return foundCookie;
  };

  const checkCookies = () => {
    return getCookieValue(cookieName) ? true : false;
  };

  const setCookie = (cookieValue, expirationDays) => {
    console.log('This runs');
    const date = new Date();
    date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
    document.cookie = `${cookieName}=${cookieValue};expires=${date.toUTCString()};path=/`;
    setIsCookieSet(true);
  };

  return [isCookieSet, setCookie, getCookieValue];
};

export default useCookie;
