import React from 'react';
import Container from '../components/layout/Container';
import ColoredText from '../components/typography/ColoredText';
import CenteredBlock from '../components/layout/CenteredBlock';
import Heading from '../components/typography/Heading';
import Button from '../components/buttons/Button';
import { Link } from 'react-router-dom';
import Hider from '../components/layout/Hider';
import illustrationMobile from '../assets/img/main-illustration-mobile@2x.png';
import illustrationDesktop from '../assets/img/main-illustration-desktop@2x.png';
import styled from 'styled-components';
import useScrollToTopOnPageLoad from '../hooks/useScrollToTopOnPageLoad';

const MarketingHeadline = styled(Heading)`
  @media screen and (min-width: 1024px) {
    margin-bottom: 3rem;
  }
`;

const Landing = () => {
  useScrollToTopOnPageLoad();

  return (
    <Container fullHeight contentCenteredMobile padding="4rem 2rem 2rem 2rem">
      <CenteredBlock>
        <Hider hideOnDesktop>
          <MobileIllustration src={illustrationMobile} alt="Vintage Poker" />
        </Hider>
        <MarketingHeadline as="h2" headingClass="h1" textCenteredOnMobile>
          Join the world’s most{' '}
          <ColoredText>
            classy
            <br />
            online poker
          </ColoredText>{' '}
          experience!
        </MarketingHeadline>

        <MarketingHeadline as="h3" headingClass="h6" textCenteredOnMobile>
          You receive <ColoredText emphazised>30.000 free chips</ColoredText> on
          registration.
        </MarketingHeadline>

        <Wrapper>
          <Button
            as={Link}
            to="/register"
            large
            primary
            fullWidthOnMobile
            autoFocus
          >
            Register
          </Button>
          <Button as={Link} to="/login" large secondary fullWidthOnMobile>
            Login
          </Button>
        </Wrapper>
      </CenteredBlock>
      <Hider hideOnMobile>
        <DesktopIllustration src={illustrationDesktop} alt="Vintage Poker" />
      </Hider>
    </Container>
  );
};

const MobileIllustration = styled.img`
  margin: 1rem auto;
  width: 70%;
  max-width: 380px;

  @media screen and (orientation: landscape) {
    display: none;
  }
`;

const DesktopIllustration = styled.img`
  position: relative;
  margin-left: 2rem;
  right: -30px;
  max-width: 400px;
`;

const Wrapper = styled.div`
  max-width: 624px;
  margin: 0 auto;

  & ${Button}:not(:first-child) {
    margin-top: 1rem;
  }

  @media screen and (min-width: 1024px) {
    margin: 0;
    margin-top: 1.5rem;

    & ${Button}:not(:first-child) {
      margin-left: 1rem;
      margin-top: 0;
    }
  }
`;

export default Landing;
