import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components/macro';
import { axisTop, select } from 'd3';

const propTypes = {
  compiledScale: PT.func.isRequired,
  topOffset: PT.number,
  color: PT.string,
};
const defaultProps = {
  topOffset: 0,
  color: 'white',
};

const XAxis = ({ compiledScale, topOffset, color }) => {
  const ref = React.useRef(null);
  const axisGen = axisTop(compiledScale);
  select(ref.current)
    .call(axisGen)
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', '1.25em')
    .attr('dy', '0.5em')
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
  g:nth-child(odd) {
    text {
      display: none;
      @media screen and (min-width: 400px) {
        display: block;
      }
    }
  }
`;
