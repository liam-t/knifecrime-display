/* eslint-disable import/prefer-default-export */

const getContinuousPath = (path, shouldReplaceStart = true, shouldReplaceEnd = true) => {
  let rtn = `${path}`;
  if (shouldReplaceStart) rtn = rtn.replace(/^M/, 'L');
  if (shouldReplaceEnd) rtn = rtn.replace(/z$/, '');
  return rtn;
};

export {
  getContinuousPath,
};
