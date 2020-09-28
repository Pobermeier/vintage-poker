import React from 'react';
import PropTypes from 'prop-types';
import EyeIcon from '../icons/EyeIcon';
import styled from 'styled-components';

const StyledShowPasswordButton = styled.div`
  position: absolute;
  z-index: 40;
  right: 15px;
  bottom: 3px;
  cursor: pointer;

  svg {
    width: 30px;
  }
`;

const clickHandler = (ref) => {
  if (ref.current.type === 'password') {
    ref.current.type = 'text';
  } else {
    ref.current.type = 'password';
  }
};

const ShowPasswordButton = ({ passwordRef }) => {
  return (
    <StyledShowPasswordButton onClick={() => clickHandler(passwordRef)}>
      <EyeIcon />
    </StyledShowPasswordButton>
  );
};

ShowPasswordButton.propTypes = {
  clickHandler: PropTypes.func,
};

export default ShowPasswordButton;
