import { useState, useEffect } from 'react';
import * as serviceWorker from '../serviceWorker';

const useServiceWorker = (callback) => {
  const [serviceWorkerData, setServiceWorkerData] = useState(null);

  useEffect(() => {
    serviceWorker.register({ onUpdate: onServiceWorkerUpdate });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    serviceWorkerData && serviceWorkerData.newVersionAvailable && callback();
    // eslint-disable-next-line
  }, [serviceWorkerData]);

  const onServiceWorkerUpdate = (registration) =>
    setServiceWorkerData({
      waitingWorker: registration && registration.waiting,
      newVersionAvailable: true,
    });

  const updateServiceWorker = () => {
    const { waitingWorker } = serviceWorkerData;
    waitingWorker && waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    setServiceWorkerData({ newVersionAvailable: false });
    window.location.reload();
  };

  return [updateServiceWorker];
};

export default useServiceWorker;
