import React from 'react';
import Container from '../components/layout/Container';
import table from '../assets/game/table.svg';
import styled from 'styled-components';
import Button from '../components/buttons/Button';
import Text from '../components/typography/Text';
import rotateGif from '../assets/game/rotate.gif';

const Wrapper = styled.div`
  display: none;
  position: fixed;
  z-index: 105;
  background-color: hsl(202, 49%, 18%);
  padding: 2rem;
  width: 100%;
  height: 100%;

  & ${Text} {
    color: ${(props) => props.theme.colors.fontColorLight};
  }

  @media screen and (orientation: portrait) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const UIWrapper = styled.div`
  @media screen and (max-width: 1024px) {
    transform: scale(0.75);
    transform-origin: bottom right;
  }
`;

const PokerTable = styled.img`
  display: block;
  pointer-events: none;
  width: 90vw;
  margin: 0 auto;

  /* @media screen and (orientation: portrait) {
    transform: rotate(90deg) scale(1.7);
  } */
`;

const Play = () => {
  return (
    <>
      <Wrapper>
        <img
          src={rotateGif}
          width="140"
          style={{ width: '140px' }}
          alt="Rotate your device into landscape mode"
        />
        <br />
        <Text textAlign="center">
          Please turn your phone into landscape mode to play!
        </Text>
      </Wrapper>
      <Container fullHeight padding="1rem 0 3rem" style={{ height: '100vh' }}>
        <div style={{ position: 'relative', width: '100%' }}>
          <PokerTable src={table} alt="Poker Table" />
          <span
            style={{
              display: 'inline-block',
              width: '5vmax',
              height: '5vmax',
              backgroundColor: 'red',
              position: 'absolute',
              top: 'calc(50% - 2.5vmax)',
              left: 'calc(50% - 2.5vmax)',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '5vmax',
                height: '5vmax',
                backgroundColor: 'red',
                position: 'absolute',
                top: '-35vh',
                left: '-25vw',
              }}
            ></span>
            <span
              style={{
                display: 'inline-block',
                width: '5vmax',
                height: '5vmax',
                backgroundColor: 'red',
                position: 'absolute',
                top: '-35vh',
                left: '0',
              }}
            ></span>
            <span
              style={{
                display: 'inline-block',
                width: '5vmax',
                height: '5vmax',
                backgroundColor: 'red',
                position: 'absolute',
                top: '-35vh',
                left: '25vw',
              }}
            ></span>
            <span
              style={{
                display: 'inline-block',
                width: '5vmax',
                height: '5vmax',
                backgroundColor: 'red',
                position: 'absolute',
                top: '20vh',
                left: '40vw',
              }}
            ></span>
            <span
              style={{
                display: 'inline-block',
                width: '5vmax',
                height: '5vmax',
                backgroundColor: 'red',
                position: 'absolute',
                top: '20vh',
                left: '-40vw',
              }}
            ></span>
          </span>
        </div>
        <UIWrapper
          style={{
            position: 'fixed',
            bottom: '1vh',
            right: '1vh',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridGap: '0.5rem',
            backgroundColor: 'hsla(49, 63%, 92%, 60%)',
            borderRadius: '2rem',
            padding: '1rem',
          }}
        >
          <div
            style={{
              gridColumn: '1 / 4',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              borderRadius: '2rem',
              padding: '0.5rem 1rem',
            }}
          >
            <input type="range" style={{ width: '100%' }} />
          </div>
          <Button small>Bet X</Button>
          <Button small secondary>
            Fold
          </Button>
          <Button small secondary>
            Check
          </Button>
          <Button small>Call X</Button>
          <Button small>All In</Button>
        </UIWrapper>
      </Container>
    </>
  );
};

export default Play;
