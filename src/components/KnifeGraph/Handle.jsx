import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components/macro';

const propTypes = {
  width: PT.number.isRequired,
  height: PT.number.isRequired,
};

const Handle = ({ width, height }) => {
  const pathData = 'M502.82,35.26C393.03-4.82,311.58-9.38,123.6,14.73C64.96,23.53,0,20.6,0,20.6l0,164.2c0,0,0,0,8.18,0 c9.77,0,27.46-11.73,27.46-61.57c0,0-3.15-33.56,31.6-33.56s19.55,0,41.7,0s97.74,9.77,131.62,9.77s65.81-12.38,102.95-12.38 s60.6,14.99,76.24,22.15c15.64,7.17,28.67-2.61,44.31-10.43s37.14-23.46,43.66-35.84S513.57,42.1,502.82,35.26z';

  return (
    <svg
      viewBox="0 0 512 185"
      xmlSpace="preserve"
      width={width}
      height={height}
      preserveAspectRatio="xMinYMin meet"
    >
      <HandlePath d={pathData} />
    </svg>
  );
};
Handle.propTypes = propTypes;
export default Handle;

const HandlePath = styled.path`
  fill: white;
`;
