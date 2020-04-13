import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components/macro';
import {
  scaleLinear,
  scaleTime,
  extent,
  area,
  select,
  axisBottom,
  axisLeft,
} from 'd3';
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

const GraphSvg = ({
  data,
  width,
  height,
}) => {
  const pad = 0;
  // const innerWidth = width - (pad * 2);
  // const innerHeight = height - (pad * 2);

  const getTimeObj = (point) => {
    const [year] = point.year.split('/');
    const month = (point.quarter.split('')[1] * 3) - 1;
    return new Date(year, month);
  };

  const valDdomain = extent(data.points.map(({ knifeCrime }) => knifeCrime));
  const timeDomain = [getTimeObj(data.points[0]), getTimeObj(data.points[data.points.length - 1])];
  const xRange = [0, width];
  const yRange = [height / 2, height];
  const xScale = scaleTime(timeDomain, xRange);
  const yScale = scaleLinear(valDdomain, yRange);

  // const radiusScale = scaleLinear(valDdomain, [2, 6]);
  const genPoints = data.points.map((point) => (
    [xScale(getTimeObj(point)), yScale(point.knifeCrime)]
  ));

  const areaPath = area()(genPoints);

  const xAxisRef = React.useRef(null);
  const xAxisGen = axisBottom(xScale);
  xAxisGen(select(xAxisRef.current));

  const yAxisRef = React.useRef(null);
  const yAxisGen = axisLeft(yScale)
    .ticks(20, 's')
    .tickPadding(5);
  yAxisGen(select(yAxisRef.current));

  return (
    <Svg>
      <PadTransform transform={`translate(${pad} ${pad})`}>
        {/* <Xaxis ref={xAxisRef} transform={`translate(0 ${height})`} /> */}
        {/* <Yaxis ref={yAxisRef} /> */}
        <AreaPath d={areaPath} />
      </PadTransform>
    </Svg>
  );
};
GraphSvg.propTypes = propTypes;
GraphSvg.defaultProps = defaultProps;

export default GraphSvg;

// const GraphSvgWrap = styled.div`
//   flex: 1 0 auto;
//   position: relative;
//   width: 900px;
//   max-width: 100%;
//   min-height: 400px;
//   max-height: 500px;
//   display: flex;
//   flex-direction: column;
// `;
const Svg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
// const Xaxis = styled.g`
//   .domain {
//     stroke-width: 3px;
//   }
// `;
// const Yaxis = styled.g`
//   .domain {
//     stroke-width: 3px;
//   }
// `;
const PadTransform = styled.g``;
const AreaPath = styled.path`
  fill: white;
`;
