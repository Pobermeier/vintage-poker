import React from 'react';
import ReactDOM from 'react-dom';
import CloseButton from '../buttons/CloseButton';
import HeadingWithLogo from '../typography/HeadingWithLogo';
import Button from '../buttons/Button';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Text from '../typography/Text';

const ModalWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 101;
  background-color: rgba(0, 0, 0, 0.5);
`;

const StyledModal = styled.div`
  position: relative;
  z-index: 101;
  max-width: 480px;
  min-width: 264px;
  width: '100%';
  text-align: center;
  background-color: ${(props) => props.theme.colors.lightestBg};
  border-radius: ${(props) => props.theme.other.stdBorderRadius};
  padding: 1.5rem;
  margin: 0 1rem;
  box-shadow: ${(props) => props.theme.other.cardDropShadow};
  opacity: 0;
  animation: fade-in 0.75s ease-out forwards;

  @media screen and (min-width: 1024px) {
    padding: 2rem;
    margin: 0;
    min-width: 400px;
    max-width: 600px;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > *:not(:last-child) {
    margin-bottom: 2rem;
  }

  & > :first-child {
    margin-bottom: 0;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
`;

const Modal = ({ children, headingText, btnText, onClose, onBtnClicked }) => {
  return ReactDOM.createPortal(
    <ModalWrapper
      id="wrapper"
      onClick={(e) => {
        if (e.target.id === 'wrapper') {
          onClose();
        }
      }}
    >
      <StyledModal>
        <IconWrapper>
          <CloseButton clickHandler={onClose} />
        </IconWrapper>
        <ModalContent>
          <HeadingWithLogo textCentered hideIconOnMobile={false}>
            {headingText}
          </HeadingWithLogo>
          {children ? (
            children
          ) : (
            <Text>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Blanditiis error aspernatur vel fugiat quisquam aut tempore,
              consequatur quo. Neque officiis magni molestias quasi, accusamus
              rem sunt incidunt inventore esse. Modi.
            </Text>
          )}
          <Button primary onClick={onBtnClicked}>
            {btnText}
          </Button>
        </ModalContent>
      </StyledModal>
    </ModalWrapper>,
    document.getElementById('modal'),
  );
};

Modal.propTypes = {
  headingText: PropTypes.string,
  btnText: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onBtnClicked: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  headingText: 'Modal',
  btnText: 'Call to Action',
};

const initialModalData = {
  children: () => (
    <Text>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis rerum
      omnis, minima perferendis, illum quasi expedita quo saepe fuga nulla
      cupiditate. Reprehenderit fugit placeat error corrupti illo ut? Numquam
      repellat molestias autem porro. Autem enim asperiores voluptatem itaque
      libero aspernatur cupiditate porro atque vel. Esse numquam tempora hic
      soluta excepturi?
    </Text>
  ),
  headingText: 'Modal',
  btnText: 'Button',
};

export default Modal;
export { initialModalData };
