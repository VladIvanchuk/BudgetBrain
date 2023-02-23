export const CardNumberNormalize = (numberCard: string) => {
  const cardNumber = "**** **** **** " + numberCard?.slice(-4);
  return cardNumber;
};
