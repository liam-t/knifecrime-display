import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components/macro';
import { axisLeft, select } from 'd3';

const propTypes = {
  compiledScale: PT.func.isRequired,
  leftOffset: PT.number,
  color: PT.string,
};
const defaultProps = {
  leftOffset: 0,
  color: 'white',
};

const YAxis = ({ compiledScale, leftOffset, color }) => {
  const ref = React.useRef(null);
  const axisGen = axisLeft(compiledScale.nice())
    .ticks(15, '.0s');
  const d3Axis = select(ref.current).call(axisGen);
  d3Axis.selectAll('.tick')
    .classed('minor', (_, i) => i % 5 !== 0)
    .classed('desktop-only', (_, i) => i % 5 !== 0);
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
  line,
  .domain {
    stroke: ${(p) => p.color};
    stroke-width: 1.5;
  }
  text {
    fill: ${(p) => p.color};
    font-weight: bold;
  }
  .tick {
    &.minor {
      line {
        transform: scaleX(0.35);
        stroke-width: 1;
      }
      text {
        display: none;
      }
    }
    &.desktop-only {
      display: none;
      @media screen and (min-width: 768px) {
        display: block;
      }
    }
  }
`;
