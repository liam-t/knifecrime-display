import React from 'react';
// import PT from 'prop-types';
import styled from 'styled-components';
import {
  scaleLinear,
  scaleTime,
  extent,
  line,
  area,
  select,
  axisBottom,
  axisLeft,
} from 'd3';
import ReactResizeDetector from 'react-resize-detector';
import { region as regionDef } from 'modeling/knifeCrimeDataPointsByRegion/index.js';

const propTypes = {
  data: regionDef.isRequired,
};
const defaultProps = {};

const RegionGraph = ({
  data,
}) => {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const pad = 40;
  const innerWidth = width - (pad * 2);
  const innerHeight = height - (pad * 2);
  const handleResize = (newWidth, newHeight) => {
    setWidth(newWidth);
    setHeight(newHeight);
  };
  // const clickHandleCircle = () => {};

  const getTimeObj = (point) => {
    const [year] = point.year.split('/');
    const month = (point.quarter.split('')[1] * 3) - 1;
    return new Date(year, month);
  };

  const valDdomain = extent(data.points.map(({ knifeCrime }) => knifeCrime));
  const timeDomain = [getTimeObj(data.points[0]), getTimeObj(data.points[data.points.length - 1])];
  const xRange = [0, innerWidth];
  const yRange = [0, innerHeight];
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
    <RegionGraphWrap>
      <ReactResizeDetector handleWidth handleHeight onResize={handleResize}>
        <Svg>
          <PadTransform transform={`translate(${pad} ${pad})`}>
            {/* <Xaxis ref={xAxisRef} transform={`translate(0 ${innerHeight})`} /> */}
            {/* <Yaxis ref={yAxisRef} /> */}
            {/* <LinePath d={line()(genPoints)} /> */}
            <AreaPath d={areaPath} />
            {/* {data.points.map((point) => {
              const { year, quarter, knifeCrime } = point;
              return (
                <Circle
                  key={`${year}-${quarter}`}
                  r={radiusScale(knifeCrime)}
                  cx={xScale(getTimeObj(point))}
                  cy={yScale(knifeCrime)}
                  fill="black"
                  onClick={() => clickHandleCircle({ year, quarter, knifeCrime })}
                />
              );
            })} */}
          </PadTransform>
        </Svg>
      </ReactResizeDetector>
    </RegionGraphWrap>
  );
};
RegionGraph.propTypes = propTypes;
RegionGraph.defaultProps = defaultProps;

export default RegionGraph;

const RegionGraphWrap = styled.div`
  flex: 1 0 auto;
  position: relative;
  width: 900px;
  max-width: 100%;
  min-height: 400px;
  max-height: 500px;
  display: flex;
  flex-direction: column;
`;
const Svg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const Xaxis = styled.g`
  .domain {
    stroke-width: 3px;
  }
`;
const Yaxis = styled.g`
  .domain {
    stroke-width: 3px;
  }
`;
const PadTransform = styled.g``;
// const Circle = styled.circle`
//   stroke-width: 1;
//   fill: white;
//   cursor: pointer;
// `;
const LinePath = styled.path`
  stroke: white;
  fill: none;
`;
const AreaPath = styled.path`
  stroke: white;
  fill: rgba(255, 255, 255, 0.2);
`;
