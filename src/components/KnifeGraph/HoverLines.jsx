import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components/macro';
import { region as regionDef } from 'modeling/knifeCrimeDataPointsByRegion/index.js';

const propTypes = {
  height: PT.number.isRequired,
  getTimeObj: PT.func.isRequired,
  compiledXScale: PT.func.isRequired,
  compiledYScale: PT.func.isRequired,
  activeData: regionDef.isRequired,
};
const defaultProps = {};

const HoverLines = ({
  height,
  getTimeObj,
  compiledXScale,
  compiledYScale,
  activeData,
}) => {
  const isNearestToCursor = (x) => true;
  return (
    <HoverLinesWrap>
      {activeData.points.map((point) => {
        const {
          year,
          quarter,
          knifeCrime,
        } = point;
        const xPos = compiledXScale(getTimeObj(point));
        const yPos = compiledYScale(knifeCrime);
        return (
          <Point key={`${year}-${quarter}`} className={isNearestToCursor(xPos) ? 'active' : ''}>
            <Line
              x1={xPos}
              y1={0}
              x2={xPos}
              y2={height}
            />
            <Circle
              r={3}
              cx={xPos}
              cy={yPos}
            />
          </Point>
        );
      })}
    </HoverLinesWrap>
  );
};
HoverLines.propTypes = propTypes;
HoverLines.defaultProps = defaultProps;
export default HoverLines;


const HoverLinesWrap = styled.g``;
const Point = styled.g`
  opacity: 0;
  &.active {
    opacity: 1;
  }
`;
const Line = styled.line`
  stroke: white;
`;
const Circle = styled.circle`
  fill: white;
`;
