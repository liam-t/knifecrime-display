import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components/macro';
import { region as regionDef } from 'modeling/knifeCrimeDataPointsByRegion/index.js';
import Animator from 'components/Animator';
import {
  scaleLog,
  scaleTime,
  extent,
} from 'd3';
import {
  getXScale,
  getYScale,
  getTimeObj,
  getContinuousPath,
} from './helpers/index.js';

const propTypes = {
  activeData: regionDef.isRequired,
  allData: PT.arrayOf(regionDef).isRequired,
  width: PT.number,
  height: PT.number,
  pathCreators: PT.shape({
    getCollarPath: PT.func.isRequired,
    getGraphPath: PT.func.isRequired,
    getHandlePath: PT.func.isRequired,
    getTipPath: PT.func.isRequired,
  }).isRequired,
};

const defaultProps = {
  width: 0,
  height: 0,
};

const Svg = ({
  activeData,
  allData,
  width,
  height,
  pathCreators,
}) => {
  const pad = 50;
  const innerWidth = Math.max(width - (pad * 2), 0);
  const innerHeight = Math.max(height - (pad * 2), 0);

  const cappedInnerHeight = Math.min(innerHeight, innerWidth * 0.15);

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
  const yScale = getYScale(
    cappedInnerHeight,
    allData,
    extent,
    scaleLog,
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

  return (
    <SvgEl>
      <CenterTransform transform={`translate(0 ${(innerHeight - cappedInnerHeight) / 2})`}>
        <PadTransform transform={`translate(${pad} ${pad})`}>
          <TipFix d={`${tipPathSection} z`} />
          <AnimatorStyled path={compPath} />
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
`;
const PadTransform = styled.g``;
const CenterTransform = styled.g``;
const AnimatorStyled = styled(Animator)`
  fill: #f42;
`;
