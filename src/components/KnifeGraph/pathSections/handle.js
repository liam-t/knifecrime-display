import svgpath from 'svgpath';
import { getContinuousPath } from '../helpers';

const getHandle = ({ width, height, leftOffset }) => {
  const pathData = 'M0,184.79c0,0,0,0,8.18,0c9.77,0,27.46-11.73,27.46-61.57c0,0-3.15-33.56,31.6-33.56s19.55,0,41.7,0s97.74,9.77,131.62,9.77 s65.81-12.38,102.95-12.38s60.6,14.99,76.24,22.15c15.64,7.17,28.67-2.61,44.31-10.43s37.14-23.46,43.66-35.84 s5.86-20.85-4.89-27.69C393.03-4.82,311.58-9.38,123.6,14.73C64.96,23.53,0,20.6,0,20.6';
  const pathDataActualWidth = 512;
  const pathDataActualHeight = 185;
  const scaleFactor = Math.min(
    width / pathDataActualWidth,
    height / pathDataActualHeight,
  );
  const scaledPath = svgpath(pathData)
    .scale(scaleFactor)
    .translate(leftOffset)
    .toString();
  const scaledPathContinuous = getContinuousPath(scaledPath, true, false);
  const scaledPathContinuousClosed = `${scaledPathContinuous}z`;
  return scaledPathContinuousClosed;
};

export default getHandle;
