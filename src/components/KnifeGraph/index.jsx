import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components/macro';
import ReactResizeDetector from 'react-resize-detector';
import { region as regionDef } from 'modeling/knifeCrimeDataPointsByRegion/index.js';
import Svg from './Svg';
import {
  collar as getCollarPath,
  graph as getGraphPath,
  handle as getHandlePath,
  tip as getTipPath,
} from './pathSections';

const propTypes = {
  activeData: regionDef.isRequired,
  allData: PT.arrayOf(regionDef).isRequired,
};

const KnifeGraph = ({ activeData, allData }) => {
  const [selectedPoint, setSelectedPoint] = React.useState(false);
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const handleResize = (newWidth, newHeight) => {
    setWidth(newWidth);
    setHeight(newHeight);
  };
  const handleSelectedPointChange = (point) => setSelectedPoint(point);

  const pathCreators = {
    getCollarPath,
    getGraphPath,
    getHandlePath,
    getTipPath,
  };
  return (
    <KnifeGraphWrap>
      <ReactResizeDetector handleWidth handleHeight onResize={handleResize}>
        <Svg
          width={width}
          height={height}
          activeData={activeData}
          allData={allData}
          pathCreators={pathCreators}
          selectedPoint={selectedPoint}
          onSelectedPointChange={handleSelectedPointChange}
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
  transform: rotate(5deg);
`;
