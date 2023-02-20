export const CardNumberNormalize = (numberCard: number) => {
  const cardNumber = "**** **** **** " + numberCard?.toString().slice(-4);
  return cardNumber;
};
