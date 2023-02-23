import { useCurrency } from "../hooks/useCurrency";

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
  base: string | undefined
): CurrencyChanges => {
  const currentData: CurrencyData | undefined = useCurrency(
    "2023-02-23",
    currenciesToShow,
    base
  );
  const dayAgoData: CurrencyData | undefined = useCurrency(
    "2023-02-13",
    currenciesToShow,
    base
  );
  const monthAgoData: CurrencyData | undefined = useCurrency(
    "2023-01-23",
    currenciesToShow,
    base
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
