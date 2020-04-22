import PT from 'prop-types';

const point = PT.shape({
  year: PT.string.isRequired,
  quarter: PT.oneOf(['Q1', 'Q2', 'Q3', 'Q4']).isRequired,
  knifeCrime: PT.number.isRequired,
});

export default point;
