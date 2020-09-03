import styled from 'styled-components';

export const Select = styled.select`
  height: 40px;
  overflow: hidden;
  padding: 0 0.5rem;
  text-align: right;
  font-size: 1.1rem;
  border: none;
  border-radius: calc(
    ${(props) => props.theme.other.stdBorderRadius} - 1.25rem
  );
  background-color: ${(props) => props.theme.colors.playingCardBgLighter};
  border-color: ${(props) => props.theme.colors.secondaryCta};
  color: ${(props) => props.theme.colors.primaryCta};
  width: 100%;

  &:focus {
    outline: none;
    border-width: 3px;
    border-color: ${(props) => props.theme.colors.primaryCta};
  }
`;
