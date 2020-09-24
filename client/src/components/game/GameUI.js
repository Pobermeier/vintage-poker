import React from 'react';
import Button from '../buttons/Button';
import { BetSlider } from './BetSliderWrapper';
import { UIWrapper } from './UIWrapper';

export const GameUI = ({
  currentTable,
  seatId,
  bet,
  setBet,
  raise,
  standUp,
  fold,
  check,
  call,
}) => (
  <UIWrapper>
    <BetSlider
      currentTable={currentTable}
      seatId={seatId}
      bet={bet}
      setBet={setBet}
    />
    <Button small onClick={() => raise(bet + currentTable.seats[seatId].bet)}>
      Bet {bet}
    </Button>
    <Button small secondary onClick={standUp}>
      Stand Up
    </Button>
    <Button small secondary onClick={fold}>
      Fold
    </Button>
    <Button
      small
      secondary
      disabled={
        currentTable.callAmount !== currentTable.seats[seatId].bet &&
        currentTable.callAmount > 0
      }
      onClick={check}
    >
      Check
    </Button>
    <Button
      small
      disabled={
        currentTable.callAmount === 0 ||
        currentTable.seats[seatId].bet >= currentTable.callAmount
      }
      onClick={call}
    >
      Call{' '}
      {currentTable.callAmount &&
      currentTable.seats[seatId].bet < currentTable.callAmount &&
      currentTable.callAmount <= currentTable.seats[seatId].stack
        ? currentTable.callAmount - currentTable.seats[seatId].bet
        : ''}
    </Button>
    <Button
      small
      onClick={() =>
        raise(currentTable.seats[seatId].stack + currentTable.seats[seatId].bet)
      }
    >
      All-in ({currentTable.seats[seatId].stack})
    </Button>
  </UIWrapper>
);
