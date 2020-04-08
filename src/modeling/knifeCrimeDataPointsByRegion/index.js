import PT from 'prop-types';
import point from './point.js';

export const region = PT.shape({
  total: PT.number.isRequired,
  name: PT.string.isRequired,
  points: PT.arrayOf(point).isRequired,
});

export default PT.arrayOf(region);
