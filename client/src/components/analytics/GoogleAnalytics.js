import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const GoogleAnalytics = ({ location, history }) => {
  useEffect(() => {
    const gtag = window.gtag;

    if (history.action === 'PUSH' && gtag && typeof gtag === 'function') {
      gtag('config', 'UA-147439668-3', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname,
      });
    }
  }, [location, history]);

  return null;
};

export default withRouter(GoogleAnalytics);
