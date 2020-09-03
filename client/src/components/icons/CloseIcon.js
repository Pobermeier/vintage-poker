import React from 'react';
import theme from '../../styles/theme';

const CloseIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="20"
      cy="20"
      r="19"
      fill={theme.colors.playingCardBgLighter}
      fillOpacity="0.8"
      stroke={theme.colors.secondaryCta}
      strokeWidth="2"
    />
    <line
      x1="8.70711"
      y1="8.29289"
      x2="31.3345"
      y2="30.9203"
      stroke={theme.colors.secondaryCta}
      strokeWidth="2"
    />
    <line
      x1="8.29289"
      y1="30.9203"
      x2="30.9203"
      y2="8.29292"
      stroke={theme.colors.secondaryCta}
      strokeWidth="2"
    />
  </svg>
);

export default CloseIcon;
