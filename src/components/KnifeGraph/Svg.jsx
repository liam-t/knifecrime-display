import React from 'react';
import PT from 'prop-types';
import styled, { keyframes } from 'styled-components/macro';
import { region as regionDef } from 'modeling/knifeCrimeDataPointsByRegion';
import quarterlyAveragesDef from 'modeling/quarterlyAverages';
import pointDef from 'modeling/dataPoint';
import Animator from 'components/Animator';
import {
  scaleSymlog,
  scaleLinear,
  scaleTime,
  extent,
  // line,
  // curveBundle,
} from 'd3';
import {
  getXScale,
  getYScale,
  getTimeObj,
  getContinuousPath,
  genPoints,
} from './helpers/index.js';
import YAxis from './YAxis';
import XAxis from './XAxis';
import Grid from './Grid';
import HoverLines from './HoverLines';
import QuarterlyAverageLine from './QuarterlyAverageLine';

const propTypes = {
  activeData: regionDef.isRequired,
  allData: PT.arrayOf(regionDef).isRequired,
  avgData: quarterlyAveragesDef.isRequired,
  width: PT.number,
  height: PT.number,
  pathCreators: PT.shape({
    getCollarPath: PT.func.isRequired,
    getGraphPath: PT.func.isRequired,
    getHandlePath: PT.func.isRequired,
    getTipPath: PT.func.isRequired,
  }).isRequired,
  onSelectedPointChange: PT.func,
  selectedPoint: PT.oneOfType([
    PT.bool,
    pointDef,
  ]).isRequired,
};

const defaultProps = {
  width: 0,
  height: 0,
  onSelectedPointChange: () => {},
};

const Svg = ({
  activeData,
  allData,
  avgData,
  width,
  height,
  pathCreators,
  onSelectedPointChange,
  selectedPoint,
}) => {
  const [
    useLogScale,
    // setUseLogScale,
  ] = React.useState(false);
  const activeYScale = useLogScale ? scaleSymlog : scaleLinear;

  const pad = 50;
  const innerWidth = Math.max(width - (pad * 2), 0);
  const innerHeight = Math.max(height - (pad * 2), 0);

  const cappedInnerHeight = Math.min(innerHeight, innerWidth * 0.2);

  const widthPercentages = {
    tip: 25,
    graph: 40,
    collar: 3,
    handle: 32,
  };
  const getWidth = (...names) => {
    const flatArraySafe = Array.isArray(names[0]) ? names[0] : names;
    return flatArraySafe.reduce((acc, item) => (
      acc + (innerWidth * widthPercentages[item]) / 100
    ), 0);
  };

  const joinPaths = (...paths) => {
    const joined = paths.reduce((acc, path) => (
      `${acc} ${path}`
    ), '');
    return joined;
  };

  const xScale = getXScale(
    getWidth('graph'),
    activeData,
    getTimeObj,
    scaleTime,
    getWidth('tip'),
  );
  const yScaleRange = [cappedInnerHeight * 0.1, cappedInnerHeight * 1.1];
  const yScale = getYScale(
    cappedInnerHeight,
    allData,
    extent,
    activeYScale,
    yScaleRange,
    // scaleLinear;
  );

  const tipPathSection = pathCreators.getTipPath({
    width: getWidth('tip'),
    height: cappedInnerHeight,
  });
  const graphPathSection = pathCreators.getGraphPath({
    activeData,
    xScale,
    yScale,
    getTimeObj,
    getContinuousPath,
    genPoints,
  });
  const collarPathSection = pathCreators.getCollarPath({
    width: getWidth('collar'),
    height: cappedInnerHeight,
    leftOffset: getWidth('tip', 'graph'),
  });
  const handlePathSection = pathCreators.getHandlePath({
    width: getWidth('handle'),
    height: cappedInnerHeight,
    leftOffset: getWidth('tip', 'graph', 'collar'),
    getContinuousPath,
  });

  const compPath = joinPaths(
    tipPathSection,
    graphPathSection,
    collarPathSection,
    handlePathSection,
  );

  const axisColor = 'white';

  // const charLineGen = line().curve(curveBundle.beta(0.7));
  // const chartLinePath = charLineGen(genPoints(activeData, xScale, getTimeObj, yScale));

  return (
    <SvgEl>
      <CenterTransform transform={`translate(0 ${(innerHeight - cappedInnerHeight) / 2})`}>
        <PadTransform transform={`translate(${pad} ${pad})`}>
          <TipFix d={`${tipPathSection} z`} />
          <AnimatorStyled path={compPath} />
          <YAxis
            compiledScale={yScale}
            leftOffset={getWidth('tip') * 0.96}
            color={axisColor}
          />
          <XAxis
            compiledScale={xScale}
            topOffset={cappedInnerHeight * -0.05}
            color={axisColor}
          />
          <Grid
            width={getWidth('graph')}
            height={cappedInnerHeight}
            leftOffset={getWidth('tip')}
            d3Scale={activeYScale}
            range={yScaleRange}
          />
          <QuarterlyAverageLine
            data={avgData}
            compiledXScale={xScale}
            compiledYScale={yScale}
          />
          <HoverLines
            height={cappedInnerHeight}
            getTimeObj={getTimeObj}
            compiledXScale={xScale}
            compiledYScale={yScale}
            activeData={activeData}
            onSelectedPointChange={onSelectedPointChange}
            selectedPoint={selectedPoint}
          />
          {/* <ChartLine d={chartLinePath} /> */}
        </PadTransform>
      </CenterTransform>
    </SvgEl>
  );
};
Svg.propTypes = propTypes;
Svg.defaultProps = defaultProps;

export default Svg;

const SvgEl = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const TipFix = styled.path`
  fill: #f42;
  animation: ${keyframes`
    from { opacity: 0 }
    to { opacity: 1 }
  `} 0.5s 1s linear both;
`;
const PadTransform = styled.g``;
const CenterTransform = styled.g``;
const AnimatorStyled = styled(Animator)`
  fill: #f42;
`;

// const ChartLine = styled.path`
//   stroke: white;
//   stroke-width: 1.5;
//   stroke-dasharray: 5, 2;
//   fill: none;
// `;
