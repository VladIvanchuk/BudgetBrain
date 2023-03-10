import { FC, useCallback, useState } from "react";
import Select from "react-select";
import { Currency } from "../components";
import { useCurrencies } from "../hooks/useCurrencies";
import { motion } from "framer-motion";

export const Currencies: FC = () => {
  const [currenciesToShow, setCurrenciesToShow] = useState<string[]>([
    "USD",
    "EUR",
    "GBP",
    "JEP",
  ]);

  const handleChange = useCallback(
    (newValue: any) => {
      if (newValue && !currenciesToShow.includes(newValue.value)) {
        setCurrenciesToShow((prevCurrencies) => [...prevCurrencies, newValue.value]);
      }
    },
    [currenciesToShow]
  );

  return (
    <main className="main-container">
      <div className="block-header">
        <h2>Currency Rates</h2>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="block-wrapper currencies"
      >
        <Currency currenciesToShow={currenciesToShow} />
        <Select
          className="currencies-select"
          options={useCurrencies()}
          defaultValue={{ label: "Add Currency", value: "null" }}
          onChange={handleChange}
        />
      </motion.div>
    </main>
  );
};
