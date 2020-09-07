import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import MainLayout from './components/layout/_MainLayout';
import HomePage from './pages/HomePage.js';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import StaticPage from './pages/StaticPage';
import NotFoundPage from './pages/NotFoundPage';
import Modal, { initialModalData } from './components/modals/Modal';
import Dashboard from './pages/Dashboard';
import useContentful from './hooks/useContentful';
import Text from './components/typography/Text';
import Button from './components/buttons/Button';
import Play from './pages/Play';
import ProtectedRoute from './components/routing/ProtectedRoute';
import Axios from 'axios';
import setAuthToken from './helpers/setAuthToken';
import LoadingScreen from './components/loading/LoadingScreen';
import useServiceWorker from './hooks/useServiceWorker';

localStorage.token && setAuthToken(localStorage.token);

const App = ({ location }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [lang, setLang] = useState('en');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);
  const [email, SetEmail] = useState(null);
  const [chipsAmount, SetChipsAmount] = useState(0);
  const [staticPages, setStaticPages] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(initialModalData);

  const contentfulClient = useContentful();
  const [updateServiceWorker] = useServiceWorker(() => {
    openModal(
      () => (
        <>
          <Text>
            A new update is available. Click the button below to refresh the app
            and get the latest and greatest stuff!
          </Text>
          <Button primary fullWidth onClick={updateServiceWorker}>
            Update &amp; Refresh
          </Button>
        </>
      ),
      'Update Available',
      'Close',
    );
  });

  useEffect(() => {
    const token = localStorage.token;

    token && loadUser(token);

    const lang =
      new URLSearchParams(location.search).get('lang') ||
      localStorage.getItem('lang') ||
      'en';
    setLang(lang);
    // eslint-disable-next-line
  }, []);

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

  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      const res = await Axios.post('/api/users', {
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
    setIsLoading(false);
  };

  const login = async (emailAddress, password) => {
    setIsLoading(true);
    try {
      const res = await Axios.post('/api/auth', {
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
    setIsLoading(false);
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

  if (isLoading) return <LoadingScreen />;
  else
    return (
      <>
        <MainLayout
          chipsAmount={chipsAmount}
          loggedIn={isLoggedIn}
          openModal={openModal}
          logout={logout}
          userName={userName}
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
