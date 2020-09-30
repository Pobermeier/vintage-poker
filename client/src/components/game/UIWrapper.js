import styled from 'styled-components';

export const UIWrapper = styled.div`
  position: fixed;
  bottom: 1vh;
  right: 1vh;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 0.5rem;
  background-color: hsla(49, 63%, 92%, 60%);
  box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 2rem;
  padding: 1rem;
  transform-origin: bottom right;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;

  @media screen and (max-width: 1068px) {
    transform: scale(0.8);
  }

  @media screen and (max-width: 968px) {
    transform: scale(0.75);
  }

  @media screen and (max-width: 868px) {
    transform: scale(0.7);
  }

  @media screen and (max-width: 812px) {
    transform: scale(0.65);
  }

  @media screen and (max-width: 668px) {
    transform: scale(0.6);
  }

  @media screen and (max-width: 648px) {
    transform: scale(0.55);
  }

  @media screen and (max-width: 568px) {
    transform: scale(0.5);
  }
`;
