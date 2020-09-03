import styled from 'styled-components';
import PropTypes from 'prop-types';

const Text = styled.p`
  font-family: ${(props) => props.theme.fontFamilySansSerif};
  text-align: ${(props) => props.textAlign};
  font-size: ${(props) =>
    props.fontSize ? props.fontSize : props.theme.fontSizeParagraph};
  font-weight: 400;
  line-height: ${(props) => props.theme.fontLineHeight};
  margin-bottom: 1rem;
`;

Text.propTypes = {
  fontSize: PropTypes.string,
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
};

Text.defaultProps = {
  textAlign: 'left',
};

export default Text;
