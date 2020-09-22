import styled from 'styled-components';

export const CenteredAnchor = styled.span`
  display: inline-block;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  position: absolute;
  top: calc(50% - 2.5vmax);
  left: calc(50% - 2.5vmax);
`;
