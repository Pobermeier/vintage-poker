import React, { useContext } from 'react';
import Navbar from '../navigation/Navbar';
import Footer from '../navigation/Footer';
import WatermarkWrapper from '../decoration/WatermarkWrapper';
import NavMenu from '../navigation/NavMenu';
import CookieBanner from '../cookies/CookieBanner';
import { withRouter } from 'react-router-dom';
import useNavMenu from '../../hooks/useNavMenu';
import useCookie from '../../hooks/useCookie';
import globalContext from '../../context/global/globalContext';
import authContext from '../../context/auth/authContext';

const MainLayout = ({
  children,
  openModal,
  lang,
  setLang,
  staticPages,
  location,
}) => {
  const { chipsAmount, userName } = useContext(globalContext);
  const { isLoggedIn, logout } = useContext(authContext);

  const [showNavMenu, openNavMenu, closeNavMenu] = useNavMenu();
  const [isCookieSet, setCookie] = useCookie('cookies-accepted', true);

  return (
    <div id="layout-wrapper">
      <Navbar
        chipsAmount={chipsAmount}
        loggedIn={isLoggedIn}
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
      {!isCookieSet && (
        <CookieBanner clickHandler={() => setCookie('1', 365)} />
      )}
    </div>
  );
};

export default withRouter(MainLayout);
