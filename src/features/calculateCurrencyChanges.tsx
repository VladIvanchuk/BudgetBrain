import { useCurrencyRates } from "../hooks/useCurrencyRates";

interface CurrencyChange {
  amount: string;
  change24h: string;
  changeMonth: string;
}
interface CurrencyData {
  [key: string]: number;
}

interface CurrencyChanges {
  [key: string]: CurrencyChange;
}

export const CalculateCurrencyChanges = (
  currenciesToShow: string[],
  base: string
): CurrencyChanges => {
  const currentData: CurrencyData | undefined = useCurrencyRates(
    "2023-02-23",
    base,
    currenciesToShow
  );
  const dayAgoData: CurrencyData | undefined = useCurrencyRates(
    "2023-02-13",
    base,
    currenciesToShow
  );
  const monthAgoData: CurrencyData | undefined = useCurrencyRates(
    "2023-01-23",
    base,
    currenciesToShow
  );

  const calculateChange = (current: number, previous: number): string => {
    const change = ((current - previous) / previous) * 100;
    const sign = change >= 0 ? "+" : "-";
    return `${sign}${Math.abs(change).toFixed(2)}`;
  };

  const changes: CurrencyChanges = {};

  for (const currency in currentData) {
    const current = currentData[currency];
    const dayAgo = dayAgoData?.[currency];
    const monthAgo = monthAgoData?.[currency];

    if (current && dayAgo && monthAgo) {
      const amount = current.toFixed(2);
      const change24h = calculateChange(current, dayAgo);
      const changeMonth = calculateChange(current, monthAgo);
      changes[currency] = {
        amount,
        change24h,
        changeMonth,
      };
    }
  }

  return changes;
};
