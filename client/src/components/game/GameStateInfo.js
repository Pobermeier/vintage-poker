import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import contentContext from '../../context/content/contentContext';
import ChipsAmountPill from './ChipsAmountPill';
import { InfoPill } from './InfoPill';

const Wrapper = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(4, auto);
  justify-content: center;
  justify-items: center;
  align-items: center;
  width: 100%;
`;

export const GameStateInfo = ({ currentTable }) => {
  const { getLocalizedString } = useContext(contentContext);

  const [roundName, setRound] = useState('');

  useEffect(() => {
    if (!currentTable.board) {
      setRound('Pre-Flop')
    } else if (currentTable.board.length === 0) {
      setRound('Pre-Flop')
    } else if (currentTable.board.length === 3) {
      setRound('Flop')
    } else if (currentTable.board.length === 4) {
      setRound('Turn')
    } else if (currentTable.board.length === 5) {
      setRound('River')
    }
  }, [currentTable]);

  return (
    <Wrapper>
      {currentTable.players.length <= 1 || currentTable.handOver ? (
        <InfoPill>{getLocalizedString('game_state-info_wait')}</InfoPill>
      ) : (
        <InfoPill>
          {roundName}
          {currentTable.wentToShowdown && 'Showdown'}
        </InfoPill>
      )}

      {!!currentTable.mainPot && (
        <ChipsAmountPill
          chipsAmount={currentTable.mainPot}
          style={{ minWidth: '150px' }}
        />
      )}

      {currentTable.sidePots &&
        currentTable.sidePots.map((sidePot) => (
          <ChipsAmountPill
            chipsAmount={sidePot.amount}
            style={{ minWidth: '150px' }}
          />
        ))}
    </Wrapper>
  );
};
