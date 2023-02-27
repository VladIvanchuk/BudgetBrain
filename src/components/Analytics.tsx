import { cardAmountNormalize } from "../features";
import { useGetUserBalanceQuery } from "../redux/api/userApiSlice";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";
import { useGetOperationsQuery } from "../redux/api/operationApiSlice";
import { motion } from "framer-motion";

export const Analytics = () => {
  const { data: { balance, income, expenses, total } = {} } = useGetUserBalanceQuery({});
  const { data: transactions = [] } = useGetOperationsQuery({});

  const chartsData = Object.values(
    transactions.reduce((acc: any, transaction: Transaction) => {
      const name = transaction.createdAt.slice(0, 10);
      const income = transaction.type === 1 ? transaction.sum : 0;
      const expenses = transaction.type === 2 ? transaction.sum : 0;

      if (!acc[name]) {
        acc[name] = { name, income, expenses };
      } else {
        acc[name].income += income;
        acc[name].expenses += expenses;
      }

      return acc;
    }, {})
  ).map(({ name, income, expenses }: any) => ({ name, income, expenses }));

  return (
    <>
      <div className="block-header">
        <h4>Analytics</h4>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="block-content analytics"
      >
        <div className="money">
          <div className="analytics-item balance">
            <h4>Balance</h4>
            <span>{cardAmountNormalize(balance ? balance : 0)}</span>
          </div>
          <div className="analytics-item income">
            <h4>Month income</h4>
            <span>{cardAmountNormalize(income ? income : 0)}</span>
          </div>
          <div className="analytics-item expenses">
            <h4>Month expenses</h4>
            <span>{cardAmountNormalize(expenses ? expenses : 0)}</span>
          </div>
          <div className="analytics-item total">
            <h4>Month total</h4>
            <span>{cardAmountNormalize(total ? total : 0)}</span>
          </div>
        </div>
        <div className="charts">
          <LineChart width={700} height={200} data={chartsData}>
            <Line type="monotone" dataKey="income" stroke="#08ff08e6" strokeWidth={3} />
            <Line type="monotone" dataKey="expenses" stroke="#ff4444e6" strokeWidth={3} />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Legend />
          </LineChart>
        </div>
      </motion.div>
    </>
  );
};
interface Transaction {
  createdAt: string;
  type: number;
  sum: number;
}

interface ChartData {
  name: string;
  income: number;
  expenses: number;
}
