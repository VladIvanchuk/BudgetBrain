import { CalculateCurrencyChanges } from "../features";
import Select from "react-select";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrencyStatus } from "../redux/currencyStatus";
import { Loader } from "./UI/Loader";
import { useCurrencies } from "../hooks/useCurrencies";
import { motion } from "framer-motion";

export const Currency: React.FC<ICurrency> = (props) => {
  const [selected, setSelected] = useState("UAH");
  const isSuccess = useSelector(selectCurrencyStatus);

  const handleChange = useCallback((newValue: any) => {
    setSelected(newValue.value);
  }, []);

  const data = CalculateCurrencyChanges(props.currenciesToShow, selected);
  const currency = props.currenciesToShow?.map((el, i) => {
    return (
      <tr className="table-row" key={i}>
        <td>
          <span className="el">{el}</span>
        </td>
        <td>{data[el]?.amount}</td>
        <td className={data[el]?.change24h.slice(0, 1) === "+" ? "green" : "red"}>
          {data[el]?.change24h}%
        </td>
        <td className={data[el]?.changeMonth.slice(0, 1) === "+" ? "green" : "red"}>
          {data[el]?.changeMonth}%
        </td>
      </tr>
    );
  });

  return (
    <>
      <div className="block-header ">
        <h4>{props.tittle}</h4>
        <Select
          className="currency-select"
          defaultValue={{ label: "UAH", value: "UAH" }}
          onChange={handleChange}
          options={useCurrencies()}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="block-content currency-table"
      >
        {isSuccess ? (
          <table>
            <thead>
              <tr className="thead-row">
                <th>Currency</th>
                <th>Amount</th>
                <th>Change(24h)</th>
                <th>Change(month)</th>
              </tr>
            </thead>
            <tbody>{currency}</tbody>
          </table>
        ) : (
          <Loader />
        )}
      </motion.div>
    </>
  );
};
interface ICurrency {
  currenciesToShow: string[];
  tittle?: string;
}
