/**
 *
 * @param {number} width context width in px
 * @param {Object} activeData active data object, see prop types for scheme
 * @param {function} getTimeObjFunc function to get time object and return standard js time obj
 * @param {function} scaleD3 a D3 scale function
 * @param {number} leftOffset left offset in px, default 0
 */
const getXScale = (width, activeData, getTimeObjFunc, scaleD3, leftOffset = 0) => {
  const timeDomain = [
    getTimeObjFunc(activeData.points[0]),
    getTimeObjFunc(activeData.points[activeData.points.length - 1]),
  ];
  const xRange = [leftOffset, leftOffset + width];
  const xScale = scaleD3(timeDomain, xRange);
  return xScale;
};

export default getXScale;
