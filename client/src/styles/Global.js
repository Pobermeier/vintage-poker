import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    box-sizing: border-box;
    font-size: ${(props) => props.theme.fonts.fontSizeRoot};
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    scrollbar-width: thin;
    scrollbar-color: ${(props) => props.theme.colors.secondaryCta} ${(props) =>
  props.theme.colors.lightBg};
    box-sizing: inherit;
  }

  *:focus {
    outline: 1px dotted ${(props) => props.theme.colors.primaryCta};
    outline-offset: 5px;
  }

  *::-webkit-scrollbar {
    width: 0.75rem;
    transition: all 0.3s ease-out;
  }

  *::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.lightBg};
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.secondaryCta};
    border-radius: ${(props) => props.theme.other.stdBorderRadius};
  }

  *::-webkit-scrollbar-thumb:hover {
    background-color: ${(props) => props.theme.colors.primaryCta};
  }

  ::-moz-selection {
    background: ${(props) => props.theme.colors.darkBg};
    color: ${(props) => props.theme.colors.fontColorLight};
  }

  ::selection {
    background: ${(props) => props.theme.colors.darkBg};
    color: ${(props) => props.theme.colors.fontColorLight};
  }

  body {
    background-color: ${(props) => props.theme.colors.lightestBg};
    color: ${(props) => props.theme.colors.fontColorDark};
    font-family: ${(props) => props.theme.fonts.fontFamilySansSerif};
    line-height: ${(props) => props.theme.fonts.fontLineHeight};
    font-weight: 400;
  }

  hr {
    background-color: ${(props) => props.theme.colors.darkBg};
    height: 1px;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.primaryCta};
    font-weight: bold;

    &:visited {
      color: ${(props) => props.theme.colors.primaryCta};
    }

    &:hover {
      color: ${(props) => props.theme.colors.primaryCtaDarker};
    }

    &:active {
      color: ${(props) => props.theme.colors.primaryCtaDarker};
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h5 {
    font-family: ${(props) => props.theme.fonts.fontFamilySerif};
    font-weight: 400;
    margin-bottom: 1.5rem;
  }

  h1,
  .h1 {
    font-size: ${(props) => props.theme.fonts.fontSizeH1};
  }

  h2,
  .h2 {
    font-size: ${(props) => props.theme.fonts.fontSizeH2};
  }

  h3,
  .h3 {
    font-size: ${(props) => props.theme.fonts.fontSizeH3};
  }

  h4,
  .h4 {
    font-size: ${(props) => props.theme.fonts.fontSizeH4};
  }

  h5,
  .h5 {
    font-size: ${(props) => props.theme.fonts.fontSizeH5};
  }

  h6,
  .h6 {
    font-size: ${(props) => props.theme.fonts.fontSizeH6};
  }

  p {
    font-family: ${(props) => props.theme.fonts.fontFamilySansSerif};
    font-size: ${(props) => props.theme.fonts.fontSizeParagraph};
    font-weight: 400;
    line-height: ${(props) => props.theme.fonts.fontLineHeight};
    margin-bottom: 1rem;
  }

  input,
  textarea,
  button,
  div,
  select,
  a {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  img {
    width: 100%;
  }

  @media screen and (max-width: 1024px){
    :root{
      font-size: ${(props) => props.theme.fonts.fontSizeRootMobile};
    }
  }

  @media screen and (max-width: 468px){
    *:focus {
      outline: none;
    }
  }
`;

export default GlobalStyles;
