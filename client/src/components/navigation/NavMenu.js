import React from 'react';
import styled from 'styled-components';
import CloseButton from '../buttons/CloseButton';
import Button from '../buttons/Button';
import Text from '../typography/Text';
import ColoredText from '../typography/ColoredText';
import ChipsAmount from '../user/ChipsAmount';
import { Link } from 'react-router-dom';
import { Select } from '../forms/Select';
import lobbyIcon from '../../assets/icons/lobby-icon.svg';
import newsIcon from '../../assets/icons/news-icon.svg';
import userIcon from '../../assets/icons/user-icon.svg';

const NavMenuWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.3);
`;

const StyledNavMenu = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: ${(props) => props.theme.colors.lightestBg};
  box-shadow: ${(props) => props.theme.other.navMenuDropShadow};
  overflow: hidden;

  @media screen and (max-width: 400px) {
    width: 85vw;
  }
`;

const MenuHeader = styled.div`
  padding: 0.5rem 1rem 0;
  justify-self: flex-start;
`;

const MenuItem = styled(Link)`
  display: flex;
  padding: 0.75rem 1rem;
  justify-content: space-between;
  width: 100%;
  text-align: right;
  font-family: ${(props) => props.theme.fonts.fontFamilySansSerif};
  color: ${(props) => props.theme.colors.primaryCta} !important;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightestBg};
  background-color: ${(props) => props.theme.colors.lightBg} !important;
  font-size: ${(props) => props.theme.fonts.fontSizeParagraph};
  font-weight: normal;

  &:hover {
    background-color: ${(props) => props.theme.colors.goldenColor} !important;
  }

  &:focus {
    outline: none;
    border-left: 4px solid ${(props) => props.theme.colors.primaryCta};
  }
`;

const MenuBody = styled.div`
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }
`;

const MenuFooter = styled.div`
  padding: 0.5rem;
  margin: auto 0 0 0;
`;

const HorizontalWrapper = styled.div`
  display: flex;
  margin: 1.5rem auto;
  justify-content: space-between;
  align-items: center;

  ${Button} {
    min-width: 6.5rem;
  }
`;

// const VerticalWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin: 1rem auto;
//   justify-content: center;
//   align-items: flex-start;
// `;

const SalutationText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.fontFamilySerif};
  font-size: 1.5rem;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;

const NavMenu = ({
  onClose,
  logout,
  userName,
  chipsAmount,
  openModal,
  lang,
  setLang,
}) => (
  <NavMenuWrapper
    id="wrapper"
    onClick={(e) => {
      if (e.target.id === 'wrapper') {
        onClose();
      }
    }}
  >
    <StyledNavMenu>
      <IconWrapper>
        <CloseButton clickHandler={onClose} autoFocus />
      </IconWrapper>
      <MenuHeader>
        <SalutationText textAlign="left">
          Hello, <ColoredText>{userName}!</ColoredText>
        </SalutationText>
        <HorizontalWrapper>
          <ChipsAmount
            chipsAmount={chipsAmount}
            clickHandler={() => {
              openModal(
                () => (
                  <Text textAlign="center">
                    We're currently working hard to get the shop up and running!
                    <br />
                    <br /> Soon you'll be able to buy chip packages for
                    competitive prices to enhance your gaming experience.
                  </Text>
                ),
                'Shop',
                'Close',
              );
            }}
          />
          <Button
            onClick={() => {
              openModal(
                () => (
                  <Text textAlign="center">
                    We're currently working hard to get the shop up and running!
                    <br />
                    <br /> Soon you'll be able to buy chip packages for
                    competitive prices to enhance your gaming experience.
                  </Text>
                ),
                'Shop',
                'Close',
              );
            }}
            small
            primary
          >
            Shop
          </Button>
        </HorizontalWrapper>
        <HorizontalWrapper>
          <Select value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="en">English</option>
            <option value="de">Deutsch</option>
          </Select>
        </HorizontalWrapper>
      </MenuHeader>
      <MenuBody>
        <MenuItem
          as={Link}
          to="/"
          onClick={() => {
            onClose();
          }}
        >
          Go To Lobby
          <img
            src={lobbyIcon}
            alt="Go to Lobby"
            width="25"
            style={{ width: '25px' }}
          />
        </MenuItem>
        <MenuItem
          as={Link}
          to="/dashboard"
          onClick={() => {
            onClose();
          }}
        >
          My Dashboard
          <img
            src={userIcon}
            alt="My Dashboard"
            width="25"
            style={{ width: '25px' }}
          />
        </MenuItem>
        <MenuItem
          as={Link}
          to="/news"
          onClick={() => {
            onClose();
          }}
        >
          Latest News
          <img
            src={newsIcon}
            alt="Latest News"
            width="25"
            style={{ width: '25px' }}
          />
        </MenuItem>
      </MenuBody>
      <MenuFooter>
        <Button
          onClick={() => {
            logout();
            onClose();
          }}
          secondary
          fullWidth
          small
        >
          Logout
        </Button>
      </MenuFooter>
    </StyledNavMenu>
  </NavMenuWrapper>
);

export default NavMenu;
