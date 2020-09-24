import React from 'react';
import styled from 'styled-components';
import cards from './cards';

const StyledPokerCard = styled.div`
  display: inline-block;
  margin: 1rem 0.5rem;

  img {
    width: 7vw;
    max-width: 80px;
    min-width: 50px;
  }
`;

const PokerCard = ({ card: { suit, rank } }) => {
  const concat = suit + rank;

  return (
    <StyledPokerCard>
      <img src={cards[concat]} alt={concat} />
    </StyledPokerCard>
  );
};

export default PokerCard;
