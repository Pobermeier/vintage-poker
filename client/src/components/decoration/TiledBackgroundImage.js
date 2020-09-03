import bgImage from '../../assets/img/bg.jpg';
import styled from 'styled-components';

export const TiledBackgroundImage = styled.div`
  display: none;

  @media screen and (min-width: 1024px) {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${bgImage});
    background-repeat: repeat;
    background-size: 600px;
    mix-blend-mode: darken;
    filter: blur(3px);
  }
`;
