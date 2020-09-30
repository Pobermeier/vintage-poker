const config = {
  contentfulSpaceId: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  contentfulAccessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
  googleAnalyticsTrackingId: process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID,
  socketURI:
    process.env.NODE_ENV === 'production'
      ? 'https://vintage-poker-app.herokuapp.com:5000/'
      : `http://${window.location.hostname}:5000/`,
};

export default config;
