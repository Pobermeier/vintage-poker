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
import ProtectedRoute from './components/routing/ProtectedRoute';
import Axios from 'axios';
import setAuthToken from './helpers/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = ({ location }) => {
  const [lang, setLang] = useState('en');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);
  const [email, SetEmail] = useState(null);
  const [chipsAmount, SetChipsAmount] = useState(0);
  const [staticPages, setStaticPages] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(initialModalData);
  const [cookiesAccepted, setcookiesAccepted] = useState(true);
  const [serviceWorkerData, setServiceWorkerData] = useState(null);

  const contentfulClient = useContentful();

  useEffect(() => {
    const token = localStorage.token;

    token && loadUser(token);

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

  const register = async (name, email, password) => {
    try {
      const res = await Axios.post('http://localhost:5000/api/users', {
        name,
        email,
        password,
      });

      const token = res.data.token;

      if (token) {
        localStorage.setItem('token', token);
        setAuthToken(token);
        await loadUser(token);
      }
    } catch (error) {
      alert(error);
    }
  };

  const login = async (emailAddress, password) => {
    try {
      const res = await Axios.post('http://localhost:5000/api/auth', {
        email: emailAddress,
        password,
      });

      const token = res.data.token;

      if (token) {
        localStorage.setItem('token', token);
        setAuthToken(token);
        await loadUser(token);
      }
    } catch (error) {
      alert(error);
    }
  };

  const loadUser = async (token) => {
    try {
      const res = await Axios.get('/api/auth', {
        headers: {
          'x-auth-token': token,
        },
      });

      const { name, email, chipsAmount } = res.data;

      setIsLoggedIn(true);
      setUserName(name);
      SetEmail(email);
      SetChipsAmount(chipsAmount);
    } catch (error) {
      localStorage.removeItem(token);
      alert(error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserName(null);
    SetEmail(null);
    SetChipsAmount(null);
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
              return (
                <RegistrationPage register={register} loggedIn={isLoggedIn} />
              );
            }}
          />
          <Route
            path="/login"
            render={() => {
              return <LoginPage login={login} loggedIn={isLoggedIn} />;
            }}
          />
          <ProtectedRoute
            isLoggedIn={isLoggedIn}
            userName={userName}
            email={email}
            path="/dashboard"
            component={Dashboard}
          />
          <ProtectedRoute
            isLoggedIn={isLoggedIn}
            path="/play"
            component={Play}
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
