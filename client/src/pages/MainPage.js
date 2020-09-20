import React, { useContext } from 'react';
import Container from '../components/layout/Container';
import Heading from '../components/typography/Heading';
import PropTypes from 'prop-types';
import ColoredText from '../components/typography/ColoredText';
import jackImg from '../assets/img/jack-rounded-img@2x.png';
import kingImg from '../assets/img/king-rounded-img@2x.png';
import queenImg from '../assets/img/queen-rounded-img@2x.png';
import queen2Img from '../assets/img/queen2-rounded-img@2x.png';
import styled from 'styled-components';
import Text from '../components/typography/Text';
import { withRouter } from 'react-router-dom';
import useScrollToTopOnPageLoad from '../hooks/useScrollToTopOnPageLoad';
import globalContext from '../context/global/globalContext';
import contentContext from '../context/content/contentContext';
import modalContext from '../context/modal/modalContext';

const WelcomeHeading = styled(Heading)`
  @media screen and (min-width: 468px) and (min-height: 600px) {
    margin: 2rem auto;
  }

  @media screen and (max-width: 900px) and (max-height: 450px) and (orientation: landscape) {
    display: none;
  }
`;

const MainMenuWrapper = styled.div`
  margin: 0 0 auto 0;
  display: grid;
  justify-content: center;
  align-content: center;
  grid-template-columns: repeat(2, minmax(250px, auto));
  grid-template-rows: repeat(2, minmax(250px, auto));
  grid-gap: 2rem;
  max-width: 600px;

  @media screen and (max-width: 900px) and (max-height: 450px) and (orientation: landscape) {
    grid-template-columns: repeat(4, 140px);
    grid-template-rows: repeat(1, minmax(140px, auto));
    grid-gap: 1rem;
  }

  @media screen and (max-width: 590px) and (max-height: 420px) and (orientation: landscape) {
    grid-template-columns: repeat(4, 120px);
    grid-template-rows: repeat(1, minmax(120px, auto));
    grid-gap: 1rem;
  }

  @media screen and (max-width: 468px) {
    grid-template-columns: repeat(1, auto);
    grid-template-rows: repeat(4, auto);
    grid-gap: 1rem;
  }
`;

const MainMenuCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.playingCardBg};
  border-radius: ${(props) => props.theme.other.stdBorderRadius};
  padding: 1.5rem 2rem;
  box-shadow: ${(props) => props.theme.other.cardDropShadow};

  &,
  & > * {
    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
  }

  ${Heading} {
    margin-bottom: 0;
    color: ${(props) => props.theme.colors.primaryCta};
    word-wrap: break-word;
  }

  img {
    margin: 1rem;
    width: 75%;
    max-width: 170px;
  }

  @media screen and (min-width: 648px) {
    font-size: 3rem;
  }

  @media screen and (max-width: 648px) {
    padding: 0.5rem;
  }

  @media screen and (max-width: 468px) {
    flex-direction: row;
    justify-content: space-between;
    border-radius: 90px 40px 40px 90px;
    padding: 0 1rem 0 0;

    ${Heading} {
      text-align: right;
      margin: 0 1rem;
    }

    img {
      max-width: 80px;
      margin: 0;
    }
  }
`;

const MainPage = ({ history }) => {
  const { userName } = useContext(globalContext);
  const { getLocalizedString } = useContext(contentContext);
  const { openModal } = useContext(modalContext);

  useScrollToTopOnPageLoad();

  return (
    <Container
      fullHeight
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-end"
      padding="6rem 2rem 2rem 2rem"
    >
      <WelcomeHeading as="h2" textCentered>
        {getLocalizedString('main_page-salutation')}{' '}
        <ColoredText>{userName}!</ColoredText>
      </WelcomeHeading>
      <MainMenuWrapper>
        <MainMenuCard onClick={() => history.push('/play')}>
          <img src={kingImg} alt="Join Table" />
          <Heading as="h3" headingClass="h5" textCentered>
            {getLocalizedString('main_page-join_table').toUpperCase()}
          </Heading>
        </MainMenuCard>
        <MainMenuCard onClick={() => history.push('/play')}>
          <img src={queen2Img} alt="Quick Game" />
          <Heading as="h3" headingClass="h5" textCentered>
            {getLocalizedString('main_page-quick_game').toUpperCase()}
          </Heading>
        </MainMenuCard>
        <MainMenuCard
          onClick={() => {
            openModal(
              () => (
                <Text textAlign="center">
                  {getLocalizedString('main_page-modal_text')}
                </Text>
              ),
              getLocalizedString('main_page-modal_heading'),
              getLocalizedString('main_page-modal_button_text'),
            );
          }}
        >
          <img src={jackImg} alt="Shop" />
          <Heading as="h3" headingClass="h5" textCentered>
            {getLocalizedString('main_page-open_shop').toUpperCase()}
          </Heading>
        </MainMenuCard>
        <MainMenuCard onClick={() => history.push('/game-rules')}>
          <img src={queenImg} alt="Rules" />
          <Heading as="h3" headingClass="h5" textCentered>
            {getLocalizedString('main_page-open_rules').toUpperCase()}
          </Heading>
        </MainMenuCard>
      </MainMenuWrapper>
    </Container>
  );
};

MainPage.propTypes = {
  userName: PropTypes.string,
};

export default withRouter(MainPage);
