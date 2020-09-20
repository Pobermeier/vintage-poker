import React, { useContext } from 'react';
import Container from '../components/layout/Container';
import CenteredBlock from '../components/layout/CenteredBlock';
import Heading from '../components/typography/Heading';
import Button from '../components/buttons/Button';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useScrollToTopOnPageLoad from '../hooks/useScrollToTopOnPageLoad';
import contentContext from '../context/content/contentContext';

const NotFoundPage = () => {
  const { getLocalizedString } = useContext(contentContext);
  useScrollToTopOnPageLoad();

  return (
    <Container fullHeight contentCenteredMobile padding="4rem 2rem 2rem 2rem">
      <CenteredBlock>
        <Heading as="h2" headingClass="h1" textCenteredOnMobile>
          {getLocalizedString('notfound-heading_txt')}
        </Heading>
        <Heading as="h3" headingClass="h5" textCenteredOnMobile>
          {getLocalizedString('notfound-content_txt')}
        </Heading>
        <Wrapper>
          <Button as={Link} to="/" large primary fullWidthOnMobile autoFocus>
            {getLocalizedString('static_page-back_btn_txt')}
          </Button>
        </Wrapper>
      </CenteredBlock>
    </Container>
  );
};

const Wrapper = styled.div`
  @media screen and (min-width: 1024px) {
    margin-top: 1.5rem;
  }
`;

export default NotFoundPage;
