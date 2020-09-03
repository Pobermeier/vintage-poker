import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import MainLayout from './components/layout/_MainLayout';
import HomePage from './pages/HomePage.js';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import StaticPage from './pages/StaticPage';
import NotFoundPage from './pages/NotFoundPage';
import Modal, { initialModalData } from './components/modals/Modal';
import { checkCookies } from './helpers/cookies';
import Dashboard from './pages/Dashboard';
import useContentful from './hooks/useContentful';
import * as serviceWorker from './serviceWorker';
import Text from './components/typography/Text';
import Button from './components/buttons/Button';
import Play from './pages/Play';

const App = ({ location }) => {
  const [lang, setLang] = useState('en');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName] = useState('Patrick');
  const [staticPages, setStaticPages] = useState(null);
  const [email] = useState('name@examplemail.com');
  const [chipsAmount] = useState(30000);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(initialModalData);
  const [cookiesAccepted, setcookiesAccepted] = useState(true);
  const [serviceWorkerData, setServiceWorkerData] = useState(null);

  const contentfulClient = useContentful();

  useEffect(() => {
    setcookiesAccepted(checkCookies('cookies-accepted'));
    const lang =
      new URLSearchParams(location.search).get('lang') ||
      localStorage.getItem('lang') ||
      'en';
    setLang(lang);

    serviceWorker.register({ onUpdate: onServiceWorkerUpdate });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    serviceWorkerData &&
      serviceWorkerData.newVersionAvailable &&
      openModal(
        () => (
          <>
            <Text>
              A new update is available. Click the button below to refresh the
              app and get the latest and greatest stuff!
            </Text>
            <Button primary fullWidth onClick={updateServiceWorker}>
              Update &amp; Refresh
            </Button>
          </>
        ),
        'Update Available',
        'Close',
      );
    // eslint-disable-next-line
  }, [serviceWorkerData]);

  useEffect(() => {
    localStorage.setItem('lang', lang);

    contentfulClient
      .getEntries({ content_type: 'staticPage', locale: lang })
      .then((res) => {
        setStaticPages(
          res.items.map((item) => ({
            slug: item.fields.slug,
            title: item.fields.title,
            content: item.fields.content.fields.value,
          })),
        );
      });
    // eslint-disable-next-line
  }, [setLang, lang]);

  const onServiceWorkerUpdate = (registration) =>
    setServiceWorkerData({
      waitingWorker: registration && registration.waiting,
      newVersionAvailable: true,
    });

  const updateServiceWorker = () => {
    const { waitingWorker } = serviceWorkerData;
    waitingWorker && waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    setServiceWorkerData({ newVersionAvailable: false });
    window.location.reload();
  };

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const openModal = (children, headingText, btnText) => {
    setModalData({ children, headingText, btnText });
    document.body.style.overflow = 'hidden';
    document.getElementById('layout-wrapper').style.filter = 'blur(4px)';
    document.getElementById('layout-wrapper').style.pointerEvents = 'none';
    document.getElementById('layout-wrapper').tabIndex = '-1';
    setShowModal(true);
  };

  const closeModal = () => {
    document.body.style.overflow = 'initial';
    document.getElementById('layout-wrapper').style.filter = 'none';
    document.getElementById('layout-wrapper').style.pointerEvents = 'all';
    setShowModal(false);
  };

  return (
    <>
      <MainLayout
        chipsAmount={chipsAmount}
        loggedIn={isLoggedIn}
        openModal={openModal}
        logout={logout}
        userName={userName}
        cookiesAccepted={cookiesAccepted}
        setcookiesAccepted={setcookiesAccepted}
        lang={lang}
        setLang={setLang}
        staticPages={staticPages}
      >
        <Switch>
          <Route
            path="/"
            exact
            render={() => {
              return (
                <HomePage
                  loggedIn={isLoggedIn}
                  logout={logout}
                  userName={userName}
                  openModal={openModal}
                  lang={lang}
                />
              );
            }}
          />
          <Route
            path="/register"
            render={() => {
              return <RegistrationPage login={login} loggedIn={isLoggedIn} />;
            }}
          />
          <Route
            path="/login"
            render={() => {
              return <LoginPage login={login} loggedIn={isLoggedIn} />;
            }}
          />
          <Route
            path="/dashboard"
            render={() => {
              return (
                <Dashboard
                  loggedIn={isLoggedIn}
                  userName={userName}
                  email={email}
                />
              );
            }}
          />
          <Route
            path="/play"
            render={() => {
              return <Play loggedIn={isLoggedIn} />;
            }}
          />
          {staticPages &&
            staticPages.map((page) => (
              <Route
                key={page.slug}
                path={`/${page.slug}`}
                component={() => (
                  <StaticPage title={page.title} content={page.content} />
                )}
              />
            ))}
          <Route component={NotFoundPage} />
        </Switch>
      </MainLayout>
      {showModal && (
        <Modal
          headingText={modalData.headingText}
          btnText={modalData.btnText}
          onClose={closeModal}
          onBtnClicked={closeModal}
        >
          {modalData.children()}
        </Modal>
      )}
    </>
  );
};

export default withRouter(App);
