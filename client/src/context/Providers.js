import React from 'react';
import GlobalState from './global/GlobalState';
import AuthProvider from './auth/AuthProvider';
import LocaProvider from './localization/LocaProvider';
import ContentProvider from './content/ContentProvider';
import ModalProvider from './modal/ModalProvider';

const Providers = ({ children }) => (
  <GlobalState>
    <AuthProvider>
      <LocaProvider>
        <ContentProvider>
          <ModalProvider>{children}</ModalProvider>
        </ContentProvider>
      </LocaProvider>
    </AuthProvider>
  </GlobalState>
);

export default Providers;
