import React, { useContext } from 'react';
import MainLayout from './layouts/_MainLayout';
import LoadingScreen from './components/loading/LoadingScreen';
import globalContext from './context/global/globalContext';
import Routes from './components/routing/Routes';
import contentContext from './context/content/contentContext';

const App = () => {
  const { isLoading } = useContext(globalContext);
  const { isLoading: contentIsLoading } = useContext(contentContext);

  return (
    <>
      {isLoading || contentIsLoading ? (
        <LoadingScreen />
      ) : (
        <MainLayout>
          <Routes />
        </MainLayout>
      )}
    </>
  );
};

export default App;
