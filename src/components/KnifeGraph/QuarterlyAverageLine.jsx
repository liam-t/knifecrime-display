import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components/macro';
import quarterlyAveragesDef from 'modeling/quarterlyAverages';
import { extent, line } from 'd3';
import { getTimeObj } from './helpers';

const propTypes = {
  data: quarterlyAveragesDef.isRequired,
  width: PT.number.isRequired,
  height: PT.number.isRequired,
  leftOffset: PT.number.isRequired,
  d3Scale: PT.func.isRequired,
};

const QuarterlyAverageLine = ({
  data,
  width,
  height,
  leftOffset,
  d3Scale,
  compiledXScale,
  compiledYScale,
}) => {
  // const xDomain = [getTimeObj(data[0]), getTimeObj(data[data.length - 1])];
  // const xRange = [leftOffset, leftOffset + width];
  // const xScale = d3Scale(xDomain, xRange);

  // const yDomain = extent(data.map(({ knifeCrime }) => knifeCrime));
  // const yRange = [0, height];
  // const yScale = d3Scale(yDomain, yRange);

  const thePath = line()(data.map((point) => ([
    compiledXScale(getTimeObj(point)),
    compiledYScale(point.knifeCrime),
  ])));

  return (
    <QuarterlyAverageLineEl d={thePath} />
  );
};
QuarterlyAverageLine.propTypes = propTypes;

export default QuarterlyAverageLine;

const QuarterlyAverageLineEl = styled.path`
  stroke: white;
  stroke-dasharray: 4;
  fill: none;
`;
