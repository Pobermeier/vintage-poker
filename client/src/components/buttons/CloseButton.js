import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CloseIcon from '../icons/CloseIcon';

const StyledCloseIcon = styled.div`
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

const CloseButton = ({ clickHandler }) => {
  return (
    <StyledCloseIcon
      onClick={clickHandler}
      onKeyDown={(e) => {
        if (e.keyCode === 13) clickHandler();
      }}
      tabIndex={0}
    >
      <CloseIcon />
    </StyledCloseIcon>
  );
};

CloseButton.propTypes = {
  clickHandler: PropTypes.func,
};

export default CloseButton;
