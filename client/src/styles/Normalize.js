import { createGlobalStyle } from 'styled-components';

const Normalize = createGlobalStyle`
  html {
      line-height: 1.15;
      -webkit-text-size-adjust: 100%;
  }
  body {
      margin: 0;
  }
  main {
      display: block;
  }
  h1 {
      font-size: 2em;
      margin: 0.67em 0;
  }
  hr {
      box-sizing: content-box;
      height: 0;
      overflow: visible;
  }
  pre {
      font-family: monospace, monospace;
      font-size: 1em;
  }
  a {
      background-color: transparent;
  }
  abbr[title] {
      border-bottom: none;
      text-decoration: underline;
      text-decoration: underline dotted;
  }
  b,
  strong {
      font-weight: bolder;
  }
  code,
  kbd,
  samp {
      font-family: monospace, monospace;
      font-size: 1em;
  }
  small {
      font-size: 80%;
  }
  sub,
  sup {
      font-size: 75%;
      line-height: 0;
      position: relative;
      vertical-align: baseline;
  }
  sub {
      bottom: -0.25em;
  }
  sup {
      top: -0.5em;
  }
  img {
      border-style: none;
  }
  button,
  input,
  optgroup,
  select,
  textarea {
      font-family: inherit;
      font-size: 100%;
      line-height: 1.15;
      margin: 0;
  }
  button,
  input {
      overflow: visible;
  }
  button,
  select {
      text-transform: none;
  }
  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
      -webkit-appearance: button;
  }
  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
      border-style: none;
      padding: 0;
  }
  button:-moz-focusring,
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring {
      outline: 1px dotted ButtonText;
  }
  fieldset {
      padding: 0.35em 0.75em 0.625em;
  }
  legend {
      box-sizing: border-box;
      color: inherit;
      display: table;
      max-width: 100%;
      padding: 0;
      white-space: normal;
  }
  progress {
      vertical-align: baseline;
  }
  textarea {
      overflow: auto;
  }
  [type="checkbox"],
  [type="radio"] {
      box-sizing: border-box;
      padding: 0;
  }
  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
      height: auto;
  }
  [type="search"] {
      -webkit-appearance: textfield;
      outline-offset: -2px;
  }
  [type="search"]::-webkit-search-decoration {
      -webkit-appearance: none;
  }
  ::-webkit-file-upload-button {
      -webkit-appearance: button;
      font: inherit;
  }
  details {
      display: block;
  }
  summary {
      display: list-item;
  }
  template {
      display: none;
  }
  [hidden] {
      display: none;
  }
  hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid grey;
    margin: 1em 0;
    padding: 0;
  }
  audio {
    vertical-align: middle;
  }
  canvas {
    vertical-align: middle;
  }
  iframe {
    vertical-align: middle;
  }
  img {
    vertical-align: middle;
  }
  svg {
    vertical-align: middle;
  }
  video {
    vertical-align: middle;
  }
  fieldset {
    border: 0;
    margin: 0;
    padding: 0;
  }
  textarea {
    resize: vertical;
  }

  @media print {
    * {
      background: transparent !important;
      color: #000 !important;
      box-shadow: none !important;
      text-shadow: none !important;
      &:before {
        background: transparent !important;
        color: #000 !important;
        box-shadow: none !important;
        text-shadow: none !important;
      }
      &:after {
        background: transparent !important;
        color: #000 !important;
        box-shadow: none !important;
        text-shadow: none !important;
      }
    }
    a {
      text-decoration: underline;
      &:visited {
        text-decoration: underline;
      }
    }
    a[href] {
      &:after {
        content: " (" attr(href) ")";
      }
    }
    abbr[title] {
      &:after {
        content: " (" attr(title) ")";
      }
    }
    a[href^="#"] {
      &:after {
        content: "";
      }
    }
    a[href^="javascript:"] {
      &:after {
        content: "";
      }
    }
    pre {
      white-space: pre-wrap !important;
      border: 1px solid grey;
      page-break-inside: avoid;
    }
    blockquote {
      border: 1px solid grey;
      page-break-inside: avoid;
    }
    thead {
      display: table-header-group;
    }
    tr {
      page-break-inside: avoid;
    }
    img {
      page-break-inside: avoid;
    }
    p {
      orphans: 3;
      widows: 3;
    }
    h2 {
      orphans: 3;
      widows: 3;
      page-break-after: avoid;
    }
    h3 {
      orphans: 3;
      widows: 3;
      page-break-after: avoid;
    }
  }
`;

export default Normalize;
