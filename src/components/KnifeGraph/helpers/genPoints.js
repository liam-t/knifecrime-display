/**
 *
 * @param {Array} activeData array of region objects as specified in proptypes
 * @param {function} xScale generated d3 scale function
 * @param {function} getTimeObj function to create correct js time object from data
 * @param {function} yScale generated d3 scale function
 * @return {string} returns a path string
 */
const genPoints = (activeData, xScale, getTimeObj, yScale) => (
  activeData.points.map((point) => (
    [xScale(getTimeObj(point)), yScale(point.knifeCrime)]
  ))
);

export default genPoints;
