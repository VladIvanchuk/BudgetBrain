import { CalculateCurrencyChanges } from "../features";
import Select from "react-select";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrencyStatus } from "../redux/currencyStatus";
import { Loader } from "./Loader";

const options = [
  { value: "UAH", label: "UAH" },
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
];

export const Currency = () => {
  const [selected, setSelected] = useState("UAH");
  const isSuccess = useSelector(selectCurrencyStatus);

  const handleChange = useCallback((newValue: any, actionMeta: any) => {
    setSelected(newValue.value);
  }, []);

  const currenciesToShow = ["USD", "EUR", "GBP"];
  const data = CalculateCurrencyChanges(currenciesToShow, selected);
  const currency = currenciesToShow?.map((el, i) => {
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
    <div className="home-block">
      <div className="block-header">
        <h4>Currency Rates</h4>
        <Select
          className="currency-select"
          defaultValue={{ label: "UAH", value: "UAH" }}
          onChange={handleChange}
          options={options}
        />
      </div>
      <div className="block-content">
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
      </div>
    </div>
  );
};
