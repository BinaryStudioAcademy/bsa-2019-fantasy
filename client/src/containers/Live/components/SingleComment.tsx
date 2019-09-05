import React, { memo } from 'react';

const PercentageStat = ({ text }) => {
  return text;
};

// Prevent component from rerendering
const arePropsEqual = (prevProps, nextProps) => {
  return true;
};

export default memo(PercentageStat, arePropsEqual);
