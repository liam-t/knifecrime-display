const getTimeObj = (point) => {
  const [year] = point.year.split('/');
  const quarterNum = Number(point.quarter.split('')[1]);

  const startOfFinancialYear = new Date(year, 4);
  const dateOffsetByQuarter = (
    startOfFinancialYear.setMonth(startOfFinancialYear.getMonth() + quarterNum * 3)
  );
  return new Date(dateOffsetByQuarter);
};

export default getTimeObj;
