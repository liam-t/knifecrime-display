import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components/macro';

const propTypes = {
  width: PT.number.isRequired,
  height: PT.number.isRequired,
  transform: PT.string,
  radius: PT.number,
};

const defaultProps = {
  transform: '',
  radius: 5,
};

const RightCap = ({
  width,
  height,
  transform,
  radius,
}) => {
  const path = `
    M 0 0
    H ${width - radius}
    Q ${width} 0 ${width} ${radius}
    V ${height - radius}
    Q ${width} ${height} ${width - radius} ${height}
    H 0
    Z
  `;

  return (
    <RightCapPath d={path} transform={transform} />
  );
};
RightCap.propTypes = propTypes;
RightCap.defaultProps = defaultProps;
export default RightCap;


const RightCapPath = styled.path`
  fill: white;
`;
