import React from 'react';
import theme from '../../styles/theme';

const HamburgerIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="20" cy="20" r="20" fill={theme.colors.primaryCta} />
    <line
      x1="8"
      y1="17.3334"
      x2="32"
      y2="17.3334"
      stroke={theme.colors.playingCardBgLighter}
      strokeWidth="2"
    />
    <line
      x1="8"
      y1="12"
      x2="32"
      y2="12"
      stroke={theme.colors.playingCardBgLighter}
      strokeWidth="2"
    />
    <line
      x1="8"
      y1="22.6666"
      x2="30"
      y2="22.6666"
      stroke={theme.colors.playingCardBgLighter}
      strokeWidth="2"
    />
    <line
      x1="8"
      y1="28"
      x2="28"
      y2="28"
      stroke={theme.colors.playingCardBgLighter}
      strokeWidth="2"
    />
  </svg>
);

export default HamburgerIcon;
