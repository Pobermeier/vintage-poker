import React, { useContext } from 'react';
import MainLayout from './components/layout/_MainLayout';
import LoadingScreen from './components/loading/LoadingScreen';
import globalContext from './context/global/globalContext';
import Routes from './components/routing/Routes';

const App = () => {
  const { isLoading } = useContext(globalContext);

  return (
    <>
      {isLoading ? (
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
