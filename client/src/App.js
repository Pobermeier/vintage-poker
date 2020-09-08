import React, { useContext } from 'react';
import MainLayout from './components/layout/_MainLayout';
import Text from './components/typography/Text';
import Button from './components/buttons/Button';
import LoadingScreen from './components/loading/LoadingScreen';
import useServiceWorker from './hooks/useServiceWorker';
import globalContext from './context/global/globalContext';
import modalContext from './context/modal/modalContext';
import Routes from './components/routing/Routes';

const App = () => {
  const { isLoading } = useContext(globalContext);
  const { openModal } = useContext(modalContext);

  const [updateServiceWorker] = useServiceWorker(() => {
    onUpdateServiceWorker(openModal, updateServiceWorker);
  });

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

const onUpdateServiceWorker = (openModal, updateServiceWorker) => {
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
};

export default App;
