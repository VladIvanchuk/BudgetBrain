export const CardAmountNormalize = (cardAmount: number) => {
  const formattedAmount = "$" + cardAmount?.toLocaleString("ua-UA");
  return formattedAmount;
};
