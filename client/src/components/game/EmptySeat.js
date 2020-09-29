import styled from 'styled-components';

export const EmptySeat = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 120px;
  height: 120px;
  padding: 1rem;
  border-radius: 100%;
  background: rgba(247, 242, 220, 0.8);
  border: 5px solid #6297b5;
  transition: all 0.1s;

  p {
    margin-bottom: 0;
  }
`;
