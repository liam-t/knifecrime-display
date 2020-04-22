import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components/macro';
import { region as regionDef } from 'modeling/knifeCrimeDataPointsByRegion/index';
import pointDef from 'modeling/knifeCrimeDataPointsByRegion/point';

const propTypes = {
  height: PT.number.isRequired,
  getTimeObj: PT.func.isRequired,
  compiledXScale: PT.func.isRequired,
  compiledYScale: PT.func.isRequired,
  activeData: regionDef.isRequired,
  onSelectedPointChange: PT.func,
  selectedPoint: PT.oneOfType([
    PT.bool,
    pointDef,
  ]).isRequired,
};
const defaultProps = {
  onSelectedPointChange: () => {},
};

const HoverLines = ({
  height,
  getTimeObj,
  compiledXScale,
  compiledYScale,
  activeData,
  onSelectedPointChange,
  selectedPoint,
}) => {
  const [range1, range2] = compiledXScale.range();
  const width = range2 - range1;
  const tickWidth = width / activeData.points.length;
  const handleMouseLeave = () => onSelectedPointChange(false);
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
        const handleMouseEnter = () => onSelectedPointChange(point);
        return (
          <Point
            key={`${year}-${quarter}`}
            className={selectedPoint === point ? 'active' : ''}
          >
            <Line
              x1={xPos}
              y1={height * 0.1}
              x2={xPos}
              y2={height * 0.99}
            />
            <Circle
              r={3}
              cx={xPos}
              cy={yPos}
            />
            <Hover
              x={xPos - (tickWidth / 2)}
              y={0}
              height={height}
              width={tickWidth}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={handleMouseEnter}
            />
          </Point>
        );
      })}
    </HoverLinesWrap>
  );
};
HoverLines.propTypes = propTypes;
HoverLines.defaultProps = defaultProps;
export default React.memo(HoverLines, (prevProps, newProps) => {
  // console.log('prevProps.selectedPoint: %o', prevProps.selectedPoint);
  // console.log('newProps: %o', newProps);
  // console.log('');
  return prevProps.selectedPoint !== newProps.selectedPoint;
});


const HoverLinesWrap = styled.g``;
const Point = styled.g`
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;
const Hover = styled.rect`
  fill: black;
  opacity: 0;
`;
const Line = styled.line`
  stroke: white;
`;
const Circle = styled.circle`
  fill: white;
  /* transform: translateY(-10px);
  transition: transform 100ms;
  ${Point}:hover & {
    transform: translateY(0);
  } */
`;
