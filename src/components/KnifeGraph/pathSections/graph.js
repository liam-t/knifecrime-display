import {
  scaleLinear,
  scaleTime,
  extent,
  line,
} from 'd3';
import { getContinuousPath } from '../helpers';

const getGraph = ({
  width,
  height,
  data,
  leftOffset,
}) => {
  const getTimeObj = (point) => {
    const [year] = point.year.split('/');
    const month = (point.quarter.split('')[1] * 3) - 1;
    return new Date(year, month);
  };

  const valDdomain = extent(data.points.map(({ knifeCrime }) => knifeCrime));
  const timeDomain = [getTimeObj(data.points[0]), getTimeObj(data.points[data.points.length - 1])];
  const xRange = [leftOffset, leftOffset + width];
  const yRange = [height / 2, height];
  const xScale = scaleTime(timeDomain, xRange);
  const yScale = scaleLinear(valDdomain, yRange);

  // const radiusScale = scaleLinear(valDdomain, [2, 6]);
  const genPoints = data.points.map((point) => (
    [xScale(getTimeObj(point)), yScale(point.knifeCrime)]
  ));

  const pathSection = line()(genPoints);

  return getContinuousPath(pathSection);
};

export default getGraph;
