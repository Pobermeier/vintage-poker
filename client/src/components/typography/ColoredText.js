import styled from 'styled-components';
import PropTypes from 'prop-types';

const ColoredText = styled.span`
  color: ${(props) => {
    if (props.secondary) {
      return props.theme.colors.secondaryCta;
    } else {
      return props.theme.colors.primaryCta;
    }
  }};
  font-weight: ${(props) => (props.emphazised ? 'bold' : 'normal')};
`;

ColoredText.propTypes = {
  emphazised: PropTypes.bool,
  secondary: PropTypes.bool,
};

ColoredText.defaultProps = {
  emphazised: false,
  secondary: false,
};

export default ColoredText;
