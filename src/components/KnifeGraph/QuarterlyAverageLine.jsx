import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components/macro';
import quarterlyAveragesDef from 'modeling/quarterlyAverages';
import { line } from 'd3';
import { getTimeObj } from './helpers';

const propTypes = {
  data: quarterlyAveragesDef.isRequired,
  compiledXScale: PT.func.isRequired,
  compiledYScale: PT.func.isRequired,
};

const QuarterlyAverageLine = ({
  data,
  compiledXScale,
  compiledYScale,
}) => {
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
