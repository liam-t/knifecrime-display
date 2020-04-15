import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components/macro';
import { axisLeft, select } from 'd3';

const propTypes = {
  scale: PT.func.isRequired,
  leftOffset: PT.number,
  color: PT.string,
};
const defaultProps = {
  leftOffset: 0,
  color: 'white',
};

const YAxis = ({ scale, leftOffset, color }) => {
  const ref = React.useRef(null);
  const axisGen = axisLeft(scale.nice())
    .ticks(3, '1s');
  select(ref.current).call(axisGen);
  return (
    <Axis
      transform={`translate(${leftOffset} 0)`}
      ref={ref}
      color={color}
    />
  );
};
YAxis.propTypes = propTypes;
YAxis.defaultProps = defaultProps;
export default YAxis;


const Axis = styled.g`
  .domain,
  line {
    stroke: ${(p) => p.color};
  }
  text {
    fill: ${(p) => p.color};
  }
`;
