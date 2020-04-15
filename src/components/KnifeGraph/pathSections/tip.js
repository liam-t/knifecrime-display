const getTip = ({ width: w, height: h }) => {
  const areaPath = `
    M ${w} 0
    H 0
    C ${w / 2} ${h}, ${w} ${h}, ${w} ${h}
  `;

  return areaPath;
};

export default getTip;
