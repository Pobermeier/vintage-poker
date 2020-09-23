import styled from 'styled-components';

export const CenteredAnchor = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  position: absolute;
  top: calc(50% - 2.5vmax);
  left: calc(50% - 2.5vmax);
`;
