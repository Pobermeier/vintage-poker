import styled from 'styled-components';
import PropTypes from 'prop-types';

const CenteredBlock = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: center;
  overflow-x: hidden;
`;

CenteredBlock.propTypes = {
  direction: PropTypes.oneOf(['column', 'row']),
};

CenteredBlock.defaultProps = {
  direction: 'column',
};

export default CenteredBlock;
