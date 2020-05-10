import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components/macro';
import pointDef from 'modeling/dataPoint';

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
  const x = selectedPoint ? compiledXScale(getTimeObj(selectedPoint)) + 10 : 0;
  const y = compiledYScale(knifeCrime);
  return (
    selectedPoint ? (
      <TooltipWrap>
        <Year x={x} y={y}>{year} &ndash; {quarter}</Year>
        <Stat x={x} y={y} dy="1.2em">{knifeCrime} incidents</Stat>
      </TooltipWrap>
    ) : null
  );
};
Tooltip.propTypes = propTypes;

export default Tooltip;

const TooltipWrap = styled.g`
  fill: white;
`;
const Year = styled.text`
  font-weight: bold;
`;
const Stat = styled.text``;
