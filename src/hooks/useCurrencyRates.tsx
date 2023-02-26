import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setCurrencyStatus } from "../redux/currencyStatus";

interface ExchangeRates {
  rates: {};
  success: boolean;
}

export const useCurrencyRates = (date: string, base: string, currencies: string[]) => {
  const dispatch = useDispatch();
  const currencyString = currencies.join(",");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(null);

  useEffect(() => {
    fetch(`https://api.exchangerate.host/${date}?base=${base}&symbols=${currencyString}`)
      .then((response) => response.json())
      .then((data) => {
        setExchangeRates(data);
        dispatch(setCurrencyStatus({ isSuccess: data.success }));
      })
      .catch((error) => {
        console.error(error);
        dispatch(setCurrencyStatus({ isSuccess: false }));
      });
  }, [date, dispatch, currencyString, base]);

  const memoizedRates = useMemo(() => exchangeRates?.rates, [exchangeRates]);

  return memoizedRates;
};
