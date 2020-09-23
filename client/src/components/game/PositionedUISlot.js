import styled from 'styled-components';

export const PositionedUISlot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  position: absolute;
  top: ${({ top }) => top};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  transform-origin: ${({ origin }) => origin || 'top left'};

  @media screen and (max-width: 868px) {
    transform: scale(0.65);
  }
`;
