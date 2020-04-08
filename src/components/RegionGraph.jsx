import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';
import { scaleLinear, extent } from 'd3';
import { withResizeDetector } from 'react-resize-detector';
import { region as regionDef } from 'modeling/knifeCrimeDataPointsByRegion/index.js';

const propTypes = {
  data: regionDef.isRequired,
  width: PT.number,
  height: PT.number,
};
const defaultProps = {
  width: 0,
  height: 0,
};

const RegionGraph = ({ width, height, data }) => {
  // const xScale = scaleLinear(domain, range);

  const yDomain = extent(data.points.map(({ knifeCrime }) => knifeCrime));
  const yRange = [0, height];
  const yScale = scaleLinear(yDomain, yRange);


  return (
    <RegionGraphWrap>
      <p>width: {width}</p>
      <p>height: {height}</p>
      <Svg>
        {data.points.map(({ year, quarter, knifeCrime }, i) => (
          <Circle
            key={`${year}-${quarter}`}
            r={5}
            cx={(width / data.points.length) * i}
            cy={yScale(knifeCrime)}
            fill="black"
          />
        ))}
      </Svg>
    </RegionGraphWrap>
  );
};
RegionGraph.propTypes = propTypes;
RegionGraph.defaultProps = defaultProps;

export default withResizeDetector(RegionGraph);

const RegionGraphWrap = styled.div`
  position: relative;
  min-height: 500px;
`;
const Svg = styled.svg`
  position: absolute;
  width: 100%;
  height: 100%;
`;
const Circle = styled.circle``;
