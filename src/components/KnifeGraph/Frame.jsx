import React from 'react';
import PT from 'prop-types';
import styled, { css } from 'styled-components/macro';
import { region as regionDef } from 'modeling/knifeCrimeDataPointsByRegion/index.js';
import Animator from 'components/Animator';

const propTypes = {
  data: regionDef.isRequired,
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

const Frame = ({
  data,
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

  const compPath = joinPaths(
    pathCreators.getTipPath({
      width: getWidth('tip'),
      height: cappedInnerHeight,
    }),
    pathCreators.getGraphPath({
      data,
      width: getWidth('graph'),
      height: cappedInnerHeight,
      leftOffset: getWidth('tip'),
    }),
    pathCreators.getCollarPath({
      width: getWidth('collar'),
      height: cappedInnerHeight,
      leftOffset: getWidth('tip', 'graph'),
    }),
    pathCreators.getHandlePath({
      width: getWidth('handle'),
      height: cappedInnerHeight,
      leftOffset: getWidth('tip', 'graph', 'collar'),
    }),
  );

  return (
    <FrameWrap>
      <Svg>
        <CenterTransform transform={`translate(0 ${(innerHeight - cappedInnerHeight) / 2})`}>
          <PadTransform transform={`translate(${pad} ${pad})`}>
            {innerWidth && <Animator path={compPath} />}
          </PadTransform>
        </CenterTransform>
      </Svg>
    </FrameWrap>
  );
};
Frame.propTypes = propTypes;
Frame.defaultProps = defaultProps;

export default Frame;

const absCss = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const FrameWrap = styled.div`
  ${absCss};
`;
const Svg = styled.svg`
  ${absCss};
`;
const KnifePath = styled.path`
  fill: white;
`;
const PadTransform = styled.g``;
const CenterTransform = styled.g``;
