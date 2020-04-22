/**
 *
 * @param {number} height context height in px
 * @param {Array} allData an array of data objects, see prop types for schema
 * @param {function} extentD3 d3's extent function
 * @param {function} scaleD3 a d3 scale function
 */
const getYScale = (
  height,
  allData,
  extentD3,
  scaleD3,
  yRange = [0, height],
) => {
  const allDataFlatPoints = allData.reduce((acc, { points }) => ([
    ...acc,
    ...points.map(({ knifeCrime }) => knifeCrime),
  ]), []);
  const allDataFlatPointsPadded = [
    ...allDataFlatPoints,
    allDataFlatPoints[allDataFlatPoints.length - 1] * 1.2,
  ];
  const valDomain = extentD3(allDataFlatPointsPadded);
  const yScale = scaleD3(valDomain, yRange);
  if (typeof yScale.constant === 'function') yScale.constant(500);
  return yScale;
};

export default getYScale;
