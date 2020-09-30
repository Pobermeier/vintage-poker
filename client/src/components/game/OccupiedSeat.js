import React from 'react';
import styled from 'styled-components';
import userImages from './userImages';
import { EmptySeat } from './EmptySeat';

const StyledOccupiedSeat = styled(EmptySeat)`
  position: relative;
  background-image: ${({ seatNumber }) => `url(${userImages[seatNumber]})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 0;
  border: ${({ hasTurn }) => (hasTurn ? `none` : `5px solid #6297b5`)};
  transition: all 0.3s;
  transform-origin: center center;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;

  &.hasTurn {
    animation: double-pulse 0.5s forwards;
  }

  .circle-timer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 130px;
    height: 130px;
    text-align: center;
    position: absolute;
    z-index: 4;

    .timer-slot {
      position: relative;
      width: 130px;
      height: 130px;
      display: inline-block;
      overflow: hidden;

      .timer-lt,
      .timer-rt {
        border-radius: 50%;
        position: relative;
        top: 50%;
        left: 0;
        z-index: 15;
        border: 10px solid #219653;
        width: 120px;
        height: 120px;
        margin-left: -60px;
        margin-top: -60px;
        border-left-color: transparent;
        border-top-color: transparent;
        z-index: 5;
      }
      .timer-lt {
        animation: 15s linear infinite timer-slide-lt;
        left: 100%;
      }
      .timer-rt {
        animation: 15s linear infinite timer-slide-rt;
      }
    }
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
      transform: scale(1.1);
    }
  }

  @keyframes timer-slide-lt {
    0% {
      transform: rotate(135deg);
    }
    50% {
      transform: rotate(135deg);
    }
    100% {
      transform: rotate(315deg);
    }
  }
  @keyframes timer-slide-rt {
    0% {
      transform: rotate(-45deg);
    }
    50% {
      transform: rotate(135deg);
    }
    100% {
      transform: rotate(135deg);
    }
  }
`;

export const OccupiedSeat = ({ hasTurn, seatNumber }) => (
  <StyledOccupiedSeat
    hasTurn={hasTurn}
    seatNumber={seatNumber}
    className={hasTurn ? 'hasTurn' : ''}
  >
    {hasTurn && (
      <div className="circle-timer">
        <div className="timer-slot">
          <div className="timer-lt"></div>
        </div>
        <div className="timer-slot">
          <div className="timer-rt"></div>
        </div>
      </div>
    )}
  </StyledOccupiedSeat>
);
