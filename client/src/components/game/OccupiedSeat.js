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
  /* transform: ${({ hasTurn }) => (hasTurn ? `scale(1.2)` : `scale(1)`)}; */
  transition: all 0.3s;

  &.hasTurn {
    animation: double-pulse 0.5s forwards;
  }

  @keyframes double-pulse {
    0% {
      transform: scale(1);
    }

    25% {
      transform: scale(1.5);
    }

    50% {
      transform: scale(1);
    }

    75% {
      transform: scale(1.5);
    }

    100% {
      transform: scale(1.25);
    }
  }
`;
