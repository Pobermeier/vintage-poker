import styled from 'styled-components';

export const UIWrapper = styled.div`
  position: fixed;
  bottom: 1vh;
  right: 1vh;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 0.5rem;
  background-color: hsla(49, 63%, 92%, 60%);
  border-radius: 2rem;
  padding: 1rem;

  @media screen and (max-width: 1024px) {
    transform: scale(0.65);
    transform-origin: bottom right;
  }
`;
