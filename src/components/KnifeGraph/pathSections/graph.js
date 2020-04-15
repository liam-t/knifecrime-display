import { line } from 'd3';

const getGraph = ({
  activeData,
  xScale,
  yScale,
  getTimeObj,
  getContinuousPath,
}) => {
  // const valDomain = extent(data.points.map(({ knifeCrime }) => knifeCrime));
  const genPoints = activeData.points.map((point) => (
    [xScale(getTimeObj(point)), yScale(point.knifeCrime)]
  ));

  const pathSection = line()(genPoints);

  return getContinuousPath(pathSection);
};

export default getGraph;
