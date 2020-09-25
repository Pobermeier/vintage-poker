import styled from 'styled-components';
import userImages from './userImages';
import { EmptySeat } from './EmptySeat';

export const OccupiedSeat = styled(EmptySeat)`
  background-image: ${({ seatNumber }) => `url(${userImages[seatNumber]})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 0;
  border: ${({ hasTurn }) =>
    hasTurn ? `8px solid #219653` : `5px solid #6297b5`};
`;
