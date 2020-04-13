import React from 'react';
import PT from 'prop-types';
import styled, { css } from 'styled-components/macro';
import { region as regionDef } from 'modeling/knifeCrimeDataPointsByRegion/index.js';
import GraphSvg from './GraphSvg';
import LeftCap from './LeftCap';
import RightCap from './RightCap';
import Handle from './Handle';

const propTypes = {
  data: regionDef.isRequired,
  width: PT.number,
  height: PT.number,
};

const defaultProps = {
  width: 0,
  height: 0,
};

const Frame = ({ data, width, height }) => {
  const pad = 50;
  const innerWidth = Math.max(width - (pad * 2), 0);
  const innerHeight = Math.max(height - (pad * 2), 0);

  const cappedInnerHeight = Math.min(innerHeight, innerWidth * 0.11);

  const widthPercentages = {
    leftCap: 25,
    graphSvg: 40,
    rightCap: 3,
    handle: 32,
  };
  const getWidth = (name) => {
    const nameArraySafe = Array.isArray(name) ? name : [name];
    return nameArraySafe.reduce((acc, item) => (
      acc + (innerWidth * widthPercentages[item]) / 100
    ), 0);
  };

  const handleYMulti = 0;
  const handleTransform = `
    translate(
      ${getWidth(['leftCap', 'graphSvg', 'rightCap']) - 3}
      ${cappedInnerHeight * (handleYMulti * -1)}
    )
  `;

  return (
    <FrameWrap>
      <Svg>
        <CenterTransform transform={`translate(0 ${(innerHeight - cappedInnerHeight) / 2})`}>
          <PadTransform transform={`translate(${pad} ${pad})`}>
            <Wrap transform={`translate(${getWidth('leftCap') - 1} 0)`}>
              <GraphSvg
                data={data}
                width={getWidth('graphSvg')}
                height={cappedInnerHeight}
              />
            </Wrap>
            <LeftCap
              width={getWidth('leftCap')}
              height={cappedInnerHeight}
            />
            <RightCap
              width={getWidth('rightCap')}
              height={cappedInnerHeight}
              transform={`translate(${getWidth(['leftCap', 'graphSvg']) - 2} 0)`}
            />
            <Wrap transform={handleTransform}>
              <Handle
                width={getWidth('handle')}
                height={cappedInnerHeight * (handleYMulti + 1)}
              />
            </Wrap>
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
const Wrap = styled.g``;
const PadTransform = styled.g``;
const CenterTransform = styled.g``;
