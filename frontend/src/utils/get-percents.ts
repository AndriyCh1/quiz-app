export const getPercents = (value: number, totalValue: number): number => {
  const roundedPercent = ((value / totalValue) * 100).toFixed(1);

  return parseFloat(roundedPercent);
};
