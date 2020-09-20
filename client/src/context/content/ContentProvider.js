import React, { useState, useEffect, useContext } from 'react';
import ContentContext from './contentContext';
import useContentful from '../../hooks/useContentful';
import locaContext from '../localization/locaContext';

const ContentProvider = ({ children }) => {
  const { lang } = useContext(locaContext);
  const contentfulClient = useContentful();

  const [isLoading, setIsLoading] = useState(true);
  const [staticPages, setStaticPages] = useState(null);
  const [localizedStrings, setLocalizedStrings] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    fetchContent();

    setIsLoading(false);
    // eslint-disable-next-line
  }, [lang]);

  const fetchContent = () => {
    contentfulClient
      .getEntries({ content_type: 'key', locale: lang })
      .then((res) => {
        let localizedStrings = {};

        res.items.forEach(
          (item) =>
            (localizedStrings[item.fields.keyName] =
              item.fields.value.fields.value),
        );

        setLocalizedStrings(localizedStrings);
      });

    contentfulClient
      .getEntries({ content_type: 'staticPage', locale: lang })
      .then((res) => {
        setStaticPages(
          res.items.map((item) => ({
            slug: item.fields.slug,
            title: item.fields.title,
            content: item.fields.content.fields.value,
          })),
        );
      });
  };

  const getLocalizedString = (key) =>
    localizedStrings && localizedStrings[key] ? localizedStrings[key] : key;

  return (
    <ContentContext.Provider
      value={{ isLoading, staticPages, getLocalizedString }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export default ContentProvider;
