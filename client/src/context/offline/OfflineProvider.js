import React, { useContext } from 'react';
import OfflineContext from './offlineContext';
import useServiceWorker from '../../hooks/useServiceWorker';
import modalContext from '../modal/modalContext';
import Text from '../../components/typography/Text';
import Button from '../../components/buttons/Button';

const OfflineProvider = ({ children }) => {
  const { openModal } = useContext(modalContext);

  const [updateServiceWorker] = useServiceWorker(() => {
    onUpdateServiceWorker();
  });

  const onUpdateServiceWorker = () => {
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

  return <OfflineContext.Provider>{children}</OfflineContext.Provider>;
};

export default OfflineProvider;
