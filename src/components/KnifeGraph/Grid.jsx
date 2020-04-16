import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components/macro';
import { nanoid } from 'nanoid';

const propTypes = {
  width: PT.number.isRequired,
  height: PT.number.isRequired,
  leftOffset: PT.number,
  d3Scale: PT.func.isRequired,
  yDivisionsAmount: PT.number,
  range: PT.oneOfType([
    PT.arrayOf(PT.number),
    PT.bool,
  ]),
  showLineExtression: PT.func,
};
const defaultProps = {
  yDivisionsAmount: 9,
  leftOffset: 0,
  range: false,
  showLineExtression: (i) => i % 4 === 0,
};

const Grid = ({
  width,
  height,
  leftOffset,
  d3Scale,
  yDivisionsAmount,
  range,
  showLineExtression,
}) => {
  const keys = Array.from({ length: yDivisionsAmount }, () => nanoid());
  const domain = [0, yDivisionsAmount];
  const yRange = range || [0, height];
  const yScale = d3Scale(domain, yRange);
  return (
    <GridWrap>
      {keys.map((key, i) => (
        showLineExtression(i) && (
          <LineY
            key={key}
            x1={leftOffset}
            y1={yScale(i)}
            x2={leftOffset + width}
            y2={yScale(i)}
          />
        )
      ))}
    </GridWrap>
  );
};
Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;

export default Grid;

const GridWrap = styled.g``;
const LineY = styled.line`
  stroke: white;
  stroke-width: 0.75;
`;
