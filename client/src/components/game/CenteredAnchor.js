import styled from 'styled-components';

export const CenteredAnchor = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  position: absolute;
  top: 50%;
  left: 50%;
`;
