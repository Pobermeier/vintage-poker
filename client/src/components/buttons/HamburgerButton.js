import React from 'react';
import PropTypes from 'prop-types';
import HamburgerIcon from '../icons/HamburgerIcon';
import styled from 'styled-components';

const StyledHamburgerButton = styled.div`
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 2px solid rgba(0, 0, 0, 0);

  &:focus {
    outline: none;
    border: 2px solid ${(props) => props.theme.colors.primaryCtaDarker};
    border-radius: 50%;
  }
`;

const HamburgerButton = ({ clickHandler }) => {
  return (
    <StyledHamburgerButton
      onClick={clickHandler}
      onKeyDown={(e) => {
        if (e.keyCode === 13) clickHandler();
      }}
      tabIndex={0}
    >
      <HamburgerIcon />
    </StyledHamburgerButton>
  );
};

HamburgerButton.propTypes = {
  clickHandler: PropTypes.func,
};

export default HamburgerButton;
