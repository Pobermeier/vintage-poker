import React from 'react';
import Container from '../components/layout/Container';
import HeadingWithLogo from '../components/typography/HeadingWithLogo';
import Button from '../components/buttons/Button';
import { Link } from 'react-router-dom';
import Markdown from 'react-remarkable';
import useScrollToTopOnPageLoad from '../hooks/useScrollToTopOnPageLoad';

const StaticPage = ({ title, content }) => {
  useScrollToTopOnPageLoad();

  return (
    <>
      <Container
        display="block"
        padding="5rem 2rem 2rem 2rem"
        contentCenteredMobile
        fullHeight
      >
        <HeadingWithLogo textCentered>{title}</HeadingWithLogo>
        <Markdown>{content}</Markdown>
      </Container>
      <Container
        display="flex"
        justifyContent="center"
        contentCenteredMobile
        margin="2rem auto"
      >
        <Button as={Link} to="/" secondary small>
          Back To Home
        </Button>
      </Container>
    </>
  );
};

export default StaticPage;
