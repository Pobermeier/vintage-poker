import { createClient } from 'contentful';

const useContentful = () => {
  const client = createClient({
    space: '4tlsutsg5se1',
    accessToken: '_BZqCnlzI0RuHvLPcOIfNxjUfS082jSJ9WmevnXSLdk',
  });
  return client;
};

export default useContentful;
