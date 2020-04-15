import { line } from 'd3';

const getGraph = ({
  activeData,
  xScale,
  yScale,
  getTimeObj,
  getContinuousPath,
  genPoints,
}) => {
  // const valDomain = extent(data.points.map(({ knifeCrime }) => knifeCrime));
  const pathSection = line()(genPoints(activeData, xScale, getTimeObj, yScale));
  return getContinuousPath(pathSection);
};

export default getGraph;
