import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components/macro';

const propTypes = {
  width: PT.number.isRequired,
  height: PT.number.isRequired,
};

const LeftCap = ({ width, height }) => {
  const areaPath = `
    M 0 0
    C ${width / 2} ${height}, ${width} ${height}, ${width} ${height}
    L ${width} 0
    Z
  `;

  return (
    <LeftCapWrap>
      <Area d={areaPath} />
    </LeftCapWrap>
  );
};
LeftCap.propTypes = propTypes;

export default LeftCap;

const LeftCapWrap = styled.g``;
const Area = styled.path`
  fill: white;
`;
