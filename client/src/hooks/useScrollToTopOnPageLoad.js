import { useEffect } from 'react';

const useScrollToTopOnPageLoad = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};

export default useScrollToTopOnPageLoad;
