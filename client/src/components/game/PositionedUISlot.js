import styled from 'styled-components';

export const PositionedUISlot = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center;
  text-align: center; */
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  position: absolute;
  top: ${({ top }) => top};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  transform-origin: ${({ origin }) => origin || 'top left'};

  @media screen and (max-width: 868px) {
    transform: ${({ scale }) => `scale(${+scale + 0.2})` || '1'};
  }

  @media screen and (max-width: 768px) {
    transform: ${({ scale }) => `scale(${+scale + 0.15})` || '1'};
  }

  @media screen and (max-width: 668px) {
    transform: ${({ scale }) => `scale(${+scale + 0.1})` || '1'};
  }

  @media screen and (max-width: 648px) {
    transform: ${({ scale }) => `scale(${scale + 0.05})` || '1'};
  }

  @media screen and (max-width: 568px) {
    transform: ${({ scale }) => `scale(${scale})` || '1'};
  }
`;
