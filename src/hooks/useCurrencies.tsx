import { useEffect, useState, useMemo } from "react";

interface ExchangeRates {
  rates: {};
  success: boolean;
}

export const useCurrencies = () => {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(null);

  useEffect(() => {
    fetch(`https://api.exchangerate.host/latest`)
      .then((response) => response.json())
      .then((data) => {
        setExchangeRates(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const memoizedRates = useMemo(() => {
    if (exchangeRates && exchangeRates.rates) {
      return Object.keys(exchangeRates.rates).map((rateKey) => ({
        value: rateKey,
        label: rateKey,
      }));
    }
    return [];
  }, [exchangeRates]);

  return memoizedRates;
};
