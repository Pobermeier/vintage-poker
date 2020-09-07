import React from 'react';
import Navbar from '../navigation/Navbar';
import Footer from '../navigation/Footer';
import WatermarkWrapper from '../decoration/WatermarkWrapper';
import NavMenu from '../navigation/NavMenu';
import CookieBanner from '../cookies/CookieBanner';
import { withRouter } from 'react-router-dom';
import useNavMenu from '../../hooks/useNavMenu';

const MainLayout = ({
  children,
  chipsAmount,
  loggedIn,
  openModal,
  logout,
  userName,
  cookiesAccepted,
  setcookiesAccepted,
  lang,
  setLang,
  staticPages,
  location,
}) => {
  const [showNavMenu, openNavMenu, closeNavMenu] = useNavMenu();

  return (
    <div id="layout-wrapper">
      <Navbar
        chipsAmount={chipsAmount}
        loggedIn={loggedIn}
        openModal={openModal}
        openNavMenu={openNavMenu}
        className="blur-target"
      />
      {showNavMenu && (
        <NavMenu
          onClose={closeNavMenu}
          userName={userName}
          logout={logout}
          chipsAmount={chipsAmount}
          lang={lang}
          setLang={setLang}
          openModal={openModal}
        ></NavMenu>
      )}
      <main className="blur-target">{children}</main>
      <WatermarkWrapper className="blur-target" />
      {location.pathname !== '/play' && (
        <Footer
          className="blur-target"
          setLang={setLang}
          staticPages={staticPages}
        />
      )}
      {!cookiesAccepted && (
        <CookieBanner
          className="blur-target"
          setcookiesAccepted={setcookiesAccepted}
        />
      )}
    </div>
  );
};

export default withRouter(MainLayout);
