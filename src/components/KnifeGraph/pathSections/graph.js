import {
  // scaleLinear,
  scaleLog,
  scaleTime,
  extent,
  line,
} from 'd3';
import { getContinuousPath } from '../helpers';

const getGraph = ({
  width,
  height,
  activeData,
  allData,
  leftOffset,
}) => {
  const getTimeObj = (point) => {
    const [year] = point.year.split('/');
    const month = (point.quarter.split('')[1] * 3) - 1;
    return new Date(year, month);
  };

  // const valDomain = extent(data.points.map(({ knifeCrime }) => knifeCrime));
  const allDataFlatPoints = allData.reduce((acc, { points }) => ([
    ...acc,
    ...points.map(({ knifeCrime }) => knifeCrime),
  ]), []);
  const valDomain = extent(allDataFlatPoints);
  const timeDomain = [
    getTimeObj(activeData.points[0]),
    getTimeObj(activeData.points[activeData.points.length - 1]),
  ];
  const xRange = [leftOffset, leftOffset + width];
  const yRange = [height / 2, height];
  const xScale = scaleTime(timeDomain, xRange);
  const yScale = scaleLog(valDomain, yRange);

  // const radiusScale = scaleLinear(valDomain, [2, 6]);
  const genPoints = activeData.points.map((point) => (
    [xScale(getTimeObj(point)), yScale(point.knifeCrime)]
  ));

  const pathSection = line()(genPoints);

  return getContinuousPath(pathSection);
};

export default getGraph;
