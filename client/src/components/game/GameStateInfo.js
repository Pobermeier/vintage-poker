import React from 'react';
import ChipsAmountPill from './ChipsAmountPill';
import { InfoPill } from './InfoPill';

export const GameStateInfo = ({ currentTable }) => (
  <div>
    {currentTable.players.length <= 1 || currentTable.handOver ? (
      <InfoPill>Waiting...</InfoPill>
    ) : (
      <InfoPill>
        {currentTable.board.length === 0 && 'Pre-Flop'}
        {currentTable.board.length === 3 && 'Flop'}
        {currentTable.board.length === 4 && 'Turn'}
        {currentTable.board.length === 5 && 'River'}
        {currentTable.wentToShowdown && 'Showdown'}
      </InfoPill>
    )}

    {!!currentTable.mainPot && (
      <ChipsAmountPill chipsAmount={currentTable.mainPot} />
    )}
  </div>
);
