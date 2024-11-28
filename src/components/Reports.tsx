import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { getChartData } from "@/utils/ChartDataUtils";
import { Transaction } from "@/types/Transaction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Reports() {
  const { t } = useLanguage();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    setTransactions(storedTransactions);
  }, []);

  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return (
      (!startDate || transactionDate >= startDate) &&
      (!endDate || transactionDate <= endDate)
    );
  });

  const { categoryData, incomeData, expenseData } = getChartData(filteredTransactions);

  const categoryChartData = Object.entries(categoryData).map(([key, value]) => ({
    name: key,
    value,
  }));

  const barChartData = [
    { name: t("reports.income"), amount: incomeData },
    { name: t("reports.expense"), amount: expenseData },
  ];

  return (
    <div className="reports-container">
      <h2 className="text-center text-xl font-bold mb-4">{t("reports.title")}</h2>

      <div className="date-picker-container flex justify-center gap-4 mb-6">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText={t("reports.startDate")}
          className="date-picker"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText={t("reports.endDate")}
          className="date-picker"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        <div className="w-full md:w-1/2 bg-gray-800 rounded-lg p-4">
          <h3 className="text-center font-semibold mb-4">{t("reports.categoryChartTitle")}</h3>
          <PieChart width={400} height={400}>
            <Pie data={categoryChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
              {categoryChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={["#8884d8", "#82ca9d", "#ffc658"][index % 3]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div className="w-full md:w-1/2 bg-gray-800 rounded-lg p-4">
          <h3 className="text-center font-semibold mb-4">{t("reports.incomeExpenseComparison")}</h3>
          <BarChart width={500} height={300} data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
