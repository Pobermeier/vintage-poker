import styled from 'styled-components';

export const Input = styled.input`
  height: 40px;
  overflow: hidden;
  padding: 0.5rem 1rem;
  text-align: left;
  font-size: 1.1rem;
  border: none;
  border-radius: calc(
    ${(props) => props.theme.other.stdBorderRadius} - 1.25rem
  );
  background-color: ${(props) => props.theme.colors.playingCardBgLighter};
  color: ${(props) => props.theme.colors.primaryCta};
  width: 100%;

  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.colors.primaryCta};
  }
`;
