export const cardAmountNormalize = (cardAmount: number) => {
  const formattedAmount = "$" + cardAmount?.toLocaleString("ua-UA");
  return formattedAmount;
};
