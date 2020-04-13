import React from 'react';
// import PT from 'prop-types';
import styled from 'styled-components/macro';
import ReactResizeDetector from 'react-resize-detector';
import Frame from 'components/KnifeGraph/Frame';
import { region as regionDef } from 'modeling/knifeCrimeDataPointsByRegion/index.js';
import {
  collar as getCollarPath,
  graph as getGraphPath,
  handle as getHandlePath,
  tip as getTipPath,
} from './pathSections';

const propTypes = {
  data: regionDef.isRequired,
};

const KnifeGraph = ({ data }) => {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const handleResize = (newWidth, newHeight) => {
    setWidth(newWidth);
    setHeight(newHeight);
  };

  const pathCreators = {
    getCollarPath,
    getGraphPath,
    getHandlePath,
    getTipPath,
  };

  return (
    <KnifeGraphWrap>
      <ReactResizeDetector handleWidth handleHeight onResize={handleResize}>
        <Frame
          width={width}
          height={height}
          data={data}
          pathCreators={pathCreators}
        />
      </ReactResizeDetector>
    </KnifeGraphWrap>
  );
};
KnifeGraph.propTypes = propTypes;
export default KnifeGraph;

const KnifeGraphWrap = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;
