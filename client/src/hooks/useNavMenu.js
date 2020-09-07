import { useState } from 'react';

const useNavMenu = () => {
  const [showNavMenu, setShowNavMenu] = useState(false);

  const openNavMenu = () => {
    document.body.style.overflow = 'hidden';
    Array.from(document.getElementsByClassName('blur-target')).forEach(
      (element) => {
        element.style.filter = 'blur(4px)';
      },
    );
    setShowNavMenu(true);
  };

  const closeNavMenu = () => {
    document.body.style.overflow = 'initial';
    Array.from(document.getElementsByClassName('blur-target')).forEach(
      (element) => {
        element.style.filter = 'none';
      },
    );
    setShowNavMenu(false);
  };

  return [showNavMenu, openNavMenu, closeNavMenu];
};

export default useNavMenu;
