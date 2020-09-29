import Text from '../typography/Text';
import styled from 'styled-components';

export const TableInfoWrapper = styled.div`
  background-color: hsla(49, 63%, 92%, 60%);
  border-radius: 2rem;
  padding: 1rem 2rem;
  box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.1);

  ${Text} {
    margin-bottom: 0;
  }
`;
