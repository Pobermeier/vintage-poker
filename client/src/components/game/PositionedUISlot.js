import styled from 'styled-components';

export const PositionedUISlot = styled.span`
  display: inline-block;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  position: absolute;
  top: ${({ top }) => top};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  transform-origin: ${({ origin }) => origin || 'top left'};

  @media screen and (max-width: 1024px) {
    transform: scale(0.65);
  }
`;
