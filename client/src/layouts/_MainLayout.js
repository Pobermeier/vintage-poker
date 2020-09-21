import React, { useContext } from 'react';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';
import WatermarkWrapper from '../components/decoration/WatermarkWrapper';
import NavMenu from '../components/navigation/NavMenu';
import CookieBanner from '../components/cookies/CookieBanner';
import { withRouter } from 'react-router-dom';
import useNavMenu from '../hooks/useNavMenu';
import useCookie from '../hooks/useCookie';
import globalContext from '../context/global/globalContext';
import authContext from '../context/auth/authContext';
import locaContext from '../context/localization/locaContext';
import contentContext from '../context/content/contentContext';
import modalContext from '../context/modal/modalContext';

const MainLayout = ({ children, location }) => {
  const { chipsAmount, userName } = useContext(globalContext);
  const { isLoggedIn, logout } = useContext(authContext);
  const { lang, setLang } = useContext(locaContext);
  const { staticPages } = useContext(contentContext);
  const { openModal } = useContext(modalContext);

  const [showNavMenu, openNavMenu, closeNavMenu] = useNavMenu();
  const [isCookieSet, setCookie] = useCookie('cookies-accepted', true);

  return (
    <div id="layout-wrapper">
      {!location.pathname.includes('/play') && (
        <Navbar
          chipsAmount={chipsAmount}
          loggedIn={isLoggedIn}
          openModal={openModal}
          openNavMenu={openNavMenu}
          className="blur-target"
        />
      )}
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
      {!location.pathname.includes('/play') && (
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
