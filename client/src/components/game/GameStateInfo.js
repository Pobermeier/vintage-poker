import React, { useContext } from 'react';
import styled from 'styled-components';
import contentContext from '../../context/content/contentContext';
import ChipsAmountPill from './ChipsAmountPill';
import { InfoPill } from './InfoPill';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  ${InfoPill} {
    width: auto;
    margin-right: 1rem;
  }

  ${ChipsAmountPill} {
    min-width: 150px;
    margin-left: 1rem;
  }
`;

export const GameStateInfo = ({ currentTable }) => {
  const { getLocalizedString } = useContext(contentContext);

  return (
    <Wrapper>
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
        <ChipsAmountPill
          chipsAmount={currentTable.mainPot}
          style={{ minWidth: '150px', marginLeft: '1rem' }}
        />
      )}
    </Wrapper>
  );
};
