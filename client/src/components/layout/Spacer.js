import styled from 'styled-components';

const Spacer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > *:not(:first-child) {
    margin-left: 1rem;
  }
`;

export default Spacer;
