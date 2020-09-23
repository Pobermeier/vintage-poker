import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: ${(props) => props.display};
  position: relative;
  flex-direction: ${(props) => props.flexDirection};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  max-width: 1440px;
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};

  @media screen and (max-width: 1024px) {
    justify-content: ${(props) =>
      props.contentCenteredMobile ? 'center' : 'space-between'};
    padding-left: 1rem;
    padding-right: 1rem;
  }

  ${(props) =>
    props.fluid &&
    css`
      max-width: 100%;
      width: 100%;
      padding: 0 3rem;
    `}

  ${(props) =>
    props.fullHeight &&
    css`
      min-height: 100vh;
    `}
`;

Container.propTypes = {
  contentCenteredMobile: PropTypes.bool,
  fluid: PropTypes.bool,
  fullHeight: PropTypes.bool,
  margin: PropTypes.string,
  padding: PropTypes.string,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  flexDirection: PropTypes.string,
  display: PropTypes.string,
};

Container.defaultProps = {
  contentCenteredMobile: false,
  fluid: false,
  fullHeight: false,
  margin: '0 auto',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
  padding: '0 2rem',
  display: 'flex',
};

export default Container;
