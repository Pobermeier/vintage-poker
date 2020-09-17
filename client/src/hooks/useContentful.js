import { createClient } from 'contentful';
import config from '../clientConfig';

const useContentful = () => {
  const client = createClient({
    space: config.contentfulSpaceId,
    accessToken: config.contentfulAccessToken,
  });
  return client;
};

export default useContentful;
