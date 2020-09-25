import React from 'react';
import styled from 'styled-components';
import table from '../../assets/game/table.svg';

const StyledPokerTable = styled.img`
  display: block;
  pointer-events: none;
  width: 95%;
  margin: 0 auto;

  /* @media screen and (orientation: portrait) {
    transform: rotate(90deg) scale(1.7);
  } */
`;

const PokerTable = () => {
  return <StyledPokerTable src={table} alt="Poker Table" />;
};

export default PokerTable;
