import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components/macro';
import { region as regionDef } from 'modeling/knifeCrimeDataPointsByRegion/index.js';

const propTypes = {
  height: PT.number.isRequired,
  getTimeObj: PT.func.isRequired,
  compiledScale: PT.func.isRequired,
  activeData: regionDef.isRequired,
};
const defaultProps = {};

const HoverLines = ({
  height,
  getTimeObj,
  compiledScale,
  activeData,
}) => {
  return (
    <HoverLinesWrap>
      {activeData.points.map((point) => {
        const {
          year,
          quarter,
          // knifecrime,
        } = point;
        const xPos = compiledScale(getTimeObj(point));
        return (
          <Line
            key={`${year}-${quarter}`}
            x1={xPos}
            y1={0}
            x2={xPos}
            y2={height}
          />
        );
      })}
    </HoverLinesWrap>
  );
};
HoverLines.propTypes = propTypes;
HoverLines.defaultProps = defaultProps;
export default HoverLines;


const HoverLinesWrap = styled.g``;
const Line = styled.line`
  stroke: white;
`;
