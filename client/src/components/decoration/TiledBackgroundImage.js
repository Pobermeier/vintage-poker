import React from 'react';
import bgImage from '../../assets/img/bg.jpg';
import styled from 'styled-components';

const StyledTiledBackgroundImage = styled.div`
  display: none;

  @media screen and (min-width: 1024px) {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    opacity: 0.5;
    background-image: url(${bgImage});
    background-repeat: repeat;
    background-size: 600px;
  }
`;

const Wrapper = styled.div`
  display: none;

  @media screen and (min-width: 1024px) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
    background-color: rgba(36, 80, 105, 0.4);
    filter: blur(1px);
  }
`;

export const TiledBackgroundImage = () => (
  <Wrapper>
    <StyledTiledBackgroundImage />
  </Wrapper>
);
