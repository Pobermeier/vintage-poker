import React from 'react';
import WatermarkLogo from './WatermarkLogo';
import WatermarkText from './WatermarkText';
import Hider from '../layout/Hider';

const WatermarkWrapper = ({ className }) => (
  <div className={className}>
    <WatermarkLogo />
    <Hider hideOnMobile>
      <WatermarkText />
    </Hider>
  </div>
);

export default WatermarkWrapper;
