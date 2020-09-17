import React, { useContext } from 'react';
import OfflineContext from './offlineContext';
import useServiceWorker from '../../hooks/useServiceWorker';
import modalContext from '../modal/modalContext';
import Text from '../../components/typography/Text';
import contentContext from '../content/contentContext';

const OfflineProvider = ({ children }) => {
  const { openModal } = useContext(modalContext);
  const { localizedStrings } = useContext(contentContext);

  const [updateServiceWorker] = useServiceWorker(() => {
    onUpdateServiceWorker();
  });

  const onUpdateServiceWorker = () => {
    openModal(
      () => (
        <Text>
          {localizedStrings &&
            (localizedStrings['service_worker-update_available'] ||
              'service_worker-update_available')}
        </Text>
      ),
      'Update Available',
      'Update Now & Refresh',
      updateServiceWorker,
    );
  };

  return <OfflineContext.Provider>{children}</OfflineContext.Provider>;
};

export default OfflineProvider;
