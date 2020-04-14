const getCollar = ({ width: w, height: h, leftOffset: l }) => {
  const radius = w * 0.25;
  const pathSection = `
    L ${l} ${h}
    H ${l + w - radius}
  `;

  return pathSection;
};

export default getCollar;
