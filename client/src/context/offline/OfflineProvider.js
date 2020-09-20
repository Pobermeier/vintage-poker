import React, { useContext } from 'react';
import OfflineContext from './offlineContext';
import useServiceWorker from '../../hooks/useServiceWorker';
import modalContext from '../modal/modalContext';
import Text from '../../components/typography/Text';
import contentContext from '../content/contentContext';

const OfflineProvider = ({ children }) => {
  const { openModal } = useContext(modalContext);
  const { getLocalizedString } = useContext(contentContext);

  const [updateServiceWorker] = useServiceWorker(() => onUpdateServiceWorker());

  const onUpdateServiceWorker = () => {
    openModal(
      () => (
        <Text>{getLocalizedString('service_worker-update_available')}</Text>
      ),
      getLocalizedString('service_worker-update_headline'),
      getLocalizedString('service_worker-update_confirm_btn_txt'),
      updateServiceWorker,
    );
  };

  return <OfflineContext.Provider>{children}</OfflineContext.Provider>;
};

export default OfflineProvider;
