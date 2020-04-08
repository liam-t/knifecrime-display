import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';
import {
  scaleLinear,
  extent,
  line,
  curveBundle,
} from 'd3';
import ReactResizeDetector from 'react-resize-detector';
import { region as regionDef } from 'modeling/knifeCrimeDataPointsByRegion/index.js';

const propTypes = {
  name: PT.string.isRequired,
  data: regionDef.isRequired,
};

const RegionGraph = ({
  name,
  data,
}) => {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const handleResize = (newWidth, newHeight) => {
    setWidth(newWidth);
    setHeight(newHeight);
  };
  const clickHandleCircle = ({ year, quarter, knifeCrime }) => {
    console.log(`Year: ${year}`);
    console.log(`Quarter: ${quarter}`);
    console.log(`Total Knife Crime: ${knifeCrime}`);
    console.log('');
  };

  const pad = 30;


  const valDdomain = extent(data.points.map(({ knifeCrime }) => knifeCrime));
  const pointsDomain = [0, data.points.length];
  const xRange = [pad, width - pad];
  const yRange = [height - pad, pad];
  const xScale = scaleLinear(pointsDomain, xRange);
  const yScale = scaleLinear(valDdomain, yRange);

  const radiusScale = scaleLinear(valDdomain, [2, 6]);
  const genPoints = data.points.map(({ knifeCrime }, i) => (
    [xScale(i), yScale(knifeCrime)]
  ));
  const getLine = (points = genPoints, beta = 0.8) => (
    line().curve(curveBundle.beta(beta))(points)
  );

  return (
    <RegionGraphWrap>
      <Name>{name}</Name>
      <ReactResizeDetector handleWidth handleHeight onResize={handleResize}>
        <Svg>
          {new Array(11).fill(0).map((_, i) => (
            <LinePath
              key={i}
              d={getLine(genPoints, i * 0.1)}
              opacity={(i + 1) * 0.1}
              // strokeWidth={(i + 1) * 0.2}
            />
          ))}
          {data.points.map(({ year, quarter, knifeCrime }, i) => (
            <Circle
              key={`${year}-${quarter}`}
              r={radiusScale(knifeCrime)}
              cx={xScale(i)}
              cy={yScale(knifeCrime)}
              fill="black"
              onClick={() => clickHandleCircle({ year, quarter, knifeCrime })}
            />
          ))}
        </Svg>
      </ReactResizeDetector>
    </RegionGraphWrap>
  );
};
RegionGraph.propTypes = propTypes;

export default RegionGraph;

const RegionGraphWrap = styled.div`
  position: relative;
  height: 500px;
  max-height: 100vh;
`;
const Name = styled.h2``;
const Svg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const Circle = styled.circle`
  stroke: black;
  stroke-width: 1;
  fill: white;
`;
const LinePath = styled.path`
  stroke: black;
  fill: none;
`;
