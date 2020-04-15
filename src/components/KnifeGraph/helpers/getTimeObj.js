const getTimeObj = (point) => {
  const [year] = point.year.split('/');
  const month = (point.quarter.split('')[1] * 3) - 1;
  return new Date(year, month);
};

export default getTimeObj;
