import React, { useContext } from 'react';
import contentContext from '../../context/content/contentContext';
import ChipsAmountPill from './ChipsAmountPill';
import { InfoPill } from './InfoPill';

export const GameStateInfo = ({ currentTable }) => {
  const { getLocalizedString } = useContext(contentContext);

  return (
    <div>
      {currentTable.players.length <= 1 || currentTable.handOver ? (
        <InfoPill>{getLocalizedString('game_state-info_wait')}</InfoPill>
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
};
