import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import RegistrationPage from '../../pages/RegistrationPage';
import LoginPage from '../../pages/LoginPage';
import Dashboard from '../../pages/Dashboard';
import Play from '../../pages/Play';
import ProtectedRoute from './ProtectedRoute';
import StaticPage from '../../pages/StaticPage';
import NotFoundPage from '../../pages/NotFoundPage';
import contentContext from '../../context/content/contentContext';

const Routes = () => {
  const { staticPages } = useContext(contentContext);

  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/register" component={RegistrationPage} />
      <Route path="/login" component={LoginPage} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <ProtectedRoute path="/play" component={Play} />
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
  );
};

export default Routes;
