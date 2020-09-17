import React, { useContext } from 'react';
import LogoWithText from '../logo/LogoWithText';
import Logo from '../logo/LogoIcon';
import Container from '../layout/Container';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import Hider from '../layout/Hider';
import Button from '../buttons/Button';
import ChipsAmount from '../user/ChipsAmount';
import HamburgerButton from '../buttons/HamburgerButton';
import Spacer from '../layout/Spacer';
import Text from '../typography/Text';
import contentContext from '../../context/content/contentContext';
import Markdown from 'react-remarkable';

const StyledNav = styled.nav`
  padding: 1rem 0;
  position: absolute;
  z-index: 99;
  width: 100%;
  background-color: ${(props) => props.theme.colors.lightestBg};
`;

const Navbar = ({
  loggedIn,
  chipsAmount,
  location,
  openModal,
  openNavMenu,
  className,
}) => {
  const { localizedStrings } = useContext(contentContext);

  if (!loggedIn)
    return (
      <StyledNav className={className}>
        <Container contentCenteredMobile>
          <Link to="/">
            <LogoWithText />
          </Link>

          <Hider hideOnMobile>
            <Spacer>
              {location.pathname !== '/register' && (
                <Button as={Link} to="/register" primary small>
                  {localizedStrings &&
                    (localizedStrings['navbar-register_btn'] ||
                      'navbar-register_btn')}
                </Button>
              )}
              {location.pathname !== '/login' && (
                <Button as={Link} to="/login" secondary small>
                  {localizedStrings &&
                    (localizedStrings['navbar-login_btn'] ||
                      'navbar-login_btn')}
                </Button>
              )}
            </Spacer>
          </Hider>
        </Container>
      </StyledNav>
    );
  else
    return (
      <StyledNav className={className}>
        <Container>
          <Link to="/">
            <Hider hideOnMobile>
              <LogoWithText />
            </Hider>
            <Hider hideOnDesktop>
              <Logo />
            </Hider>
          </Link>
          <Spacer>
            <ChipsAmount
              chipsAmount={chipsAmount}
              clickHandler={() => {
                openModal(
                  () => (
                    <Text textAlign="center">
                      <Markdown>
                        {localizedStrings &&
                          (localizedStrings['shop-coming_soon-modal_text'] ||
                            'shop-coming_soon-modal_text')}
                      </Markdown>
                    </Text>
                  ),
                  localizedStrings &&
                    (localizedStrings['shop-coming_soon-modal_heading'] ||
                      'shop-coming_soon-modal_heading'),
                  localizedStrings &&
                    (localizedStrings['shop-coming_soon-modal_btn_text'] ||
                      'shop-coming_soon-modal_btn_text'),
                );
              }}
            />
            <Hider hideOnMobile>
              <Button
                to="/"
                primary
                small
                onClick={() => {
                  openModal(
                    () => (
                      <Text textAlign="center">
                        <Markdown>
                          {localizedStrings &&
                            (localizedStrings['shop-coming_soon-modal_text'] ||
                              'shop-coming_soon-modal_text')}
                        </Markdown>
                      </Text>
                    ),
                    localizedStrings &&
                      (localizedStrings['shop-coming_soon-modal_heading'] ||
                        'shop-coming_soon-modal_heading'),
                    localizedStrings &&
                      (localizedStrings['shop-coming_soon-modal_btn_text'] ||
                        'shop-coming_soon-modal_btn_text'),
                  );
                }}
              >
                {localizedStrings &&
                  (localizedStrings['navbar-buychips_btn'] ||
                    'navbar-buychips_btn')}
              </Button>
            </Hider>
            <HamburgerButton clickHandler={openNavMenu} />
          </Spacer>
        </Container>
      </StyledNav>
    );
};

export default withRouter(Navbar);
