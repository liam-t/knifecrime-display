import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components/macro';
import pointDef from 'modeling/dataPoint';
import { useSpring, animated } from 'react-spring';
import Countup from 'react-countup';

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

  const springConfig = {
    mass: 1,
    tension: 400,
    friction: 30,
    velocity: 0,
  };

  const {
    x: springX,
    y: springY,
  } = useSpring({
    x: selectedPoint ? compiledXScale(getTimeObj(selectedPoint)) + 5 : 0,
    y: compiledYScale(knifeCrime) || 0,
    from: { x: 0, y: 0 },
    config: springConfig,
  });

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
          <Countup
            duration={0.25}
            end={knifeCrime}
            separator=","
            preserveValue
          >
            {({ countUpRef }) => (
              <tspan ref={countUpRef} />
            )}
          </Countup>
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
const Stat = styled(animated.text)`
  fill: black;
  color: black;
`;
