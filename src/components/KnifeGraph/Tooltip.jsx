import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components/macro';
import pointDef from 'modeling/dataPoint';
import { useSpring, animated } from 'react-spring';

const propTypes = {
  getTimeObj: PT.func.isRequired,
  compiledXScale: PT.func.isRequired,
  compiledYScale: PT.func.isRequired,
  selectedPoint: PT.oneOfType([
    PT.bool,
    pointDef,
  ]).isRequired,
};

const Tooltip = ({
  getTimeObj,
  compiledXScale,
  compiledYScale,
  selectedPoint,
}) => {
  const {
    year,
    quarter,
    knifeCrime,
  } = selectedPoint;

  const getX = (point) => (
    point ? compiledXScale(getTimeObj(point)) + 5 : 0
  );
  const getY = (point) => compiledYScale(point.knifeCrime) || 0;

  const [bufferedXy, setBufferedXy] = React.useState([getX(selectedPoint), getY(selectedPoint)]);
  const [bufferedX, bufferedY] = bufferedXy;

  const {
    x: springX,
    y: springY,
  } = useSpring({
    x: bufferedX,
    y: bufferedY,
    from: {
      x: 0,
      y: 0,
    },
  });

  React.useEffect(() => {
    setBufferedXy([getX(selectedPoint), getY(selectedPoint)]);
  }, [selectedPoint, getX, getY]);

  const width = 115;
  const height = 60;
  const scaleMulti = 0.8;
  const scaledWidth = width * scaleMulti;
  const scaledHeight = height * scaleMulti;
  const fontSize = 16 * scaleMulti;

  return (
    selectedPoint ? (
      <TooltipWrap>
        <Bg
          x={springX}
          y={springY.interpolate((intVal) => intVal - (scaledHeight / 2))}
          width={scaledWidth}
          height={scaledHeight}
        />
        <Year
          fontSize={fontSize}
          x={springX.interpolate((intVal) => intVal + 10)}
          y={springY}
          dy="-0.2em"
        >
          {year} &ndash; {quarter}
        </Year>
        <Stat
          fontSize={fontSize}
          x={springX.interpolate((intVal) => intVal + 10)}
          y={springY}
          dy="1em"
        >
          {knifeCrime} incidents
        </Stat>
      </TooltipWrap>
    ) : null
  );
};
Tooltip.propTypes = propTypes;

export default Tooltip;

const TooltipWrap = styled.g`
  fill: black;
  pointer-events: none;
`;
const Bg = styled(animated.rect)`
  fill: white;
`;
const Year = styled(animated.text)`
  font-weight: bold;
`;
const Stat = styled(animated.text)``;
