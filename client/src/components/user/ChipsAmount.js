import React from 'react';
import PokerChip from '../icons/PokerChip';
import { Input } from '../forms/Input';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;

  & ${Input} {
    cursor: pointer;
    text-align: right;
    padding: 0.5rem 1rem 0.5rem 2rem;
    border-radius: ${(props) => props.theme.other.stdBorderRadius};
    border: 1px solid ${(props) => props.theme.colors.primaryCta};
  }
`;

const IconWrapper = styled.label`
  cursor: pointer;
  position: absolute;
  width: 40px;
  height: 40px;
  left: 0;
  top: calc(50% - 40px / 2);
`;

const ChipsAmount = ({ chipsAmount, clickHandler }) => {
  return (
    <Wrapper onClick={clickHandler}>
      <IconWrapper htmlFor="chipsAmount">
        <PokerChip />
      </IconWrapper>
      <Input
        disabled
        type="text"
        size={10}
        value={new Intl.NumberFormat(document.documentElement.lang).format(
          chipsAmount,
        )}
        name="chipsAmount"
      />
    </Wrapper>
  );
};

ChipsAmount.propTypes = {
  chipsAmount: PropTypes.number,
  clickHandler: PropTypes.func,
};

export default ChipsAmount;
