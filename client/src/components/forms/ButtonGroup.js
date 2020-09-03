import styled from 'styled-components';

export const ButtonGroup = styled.div`
  margin: 1.25rem 0;
  width: 100%;

  & > * ~ *:not(:first-child) {
    margin-top: 1.25rem;
  }

  & > a {
    display: inline-block;
    width: 100%;
  }

  @media screen and (min-width: 1024px) {
    margin: 2rem 0 1rem 0;

    & > *:not(:first-child) {
      margin-top: 1rem;
    }
  }
`;
