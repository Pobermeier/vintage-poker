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
import globalContext from '../../context/global/globalContext';

const Routes = () => {
  const { tables } = useContext(globalContext);
  const { staticPages } = useContext(contentContext);

  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/register" component={RegistrationPage} />
      <Route path="/login" component={LoginPage} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
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
      {tables &&
        tables.map((table) => (
          <ProtectedRoute
            key={table.id}
            path={`/play/${table.id}`}
            component={Play}
          />
        ))}
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;
