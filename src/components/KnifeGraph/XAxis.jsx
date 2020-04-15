import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components/macro';
import { axisBottom, select } from 'd3';

const propTypes = {
  scale: PT.func.isRequired,
  topOffset: PT.number,
  color: PT.string,
};
const defaultProps = {
  topOffset: 0,
  color: 'white',
};

const XAxis = ({ scale, topOffset, color }) => {
  const ref = React.useRef(null);
  const axisGen = axisBottom(scale.nice())
    .ticks();
  select(ref.current)
    .call(axisGen)
    .selectAll('text')
    .style('text-anchor', 'end')
    .attr('dx', '-1em')
    .attr('dy', '.15em')
    .attr('transform', 'rotate(-65)');
  return (
    <Axis
      transform={`translate(0 ${topOffset})`}
      ref={ref}
      color={color}
    />
  );
};
XAxis.propTypes = propTypes;
XAxis.defaultProps = defaultProps;
export default XAxis;


const Axis = styled.g`
  .domain,
  line {
    stroke: ${(p) => p.color};
    stroke-width: 1.5;
  }
  text {
    fill: ${(p) => p.color};
    font-weight: bold;
  }
`;
