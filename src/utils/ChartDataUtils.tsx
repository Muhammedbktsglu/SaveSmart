import { Transaction } from "../types/Transaction";

export const getChartData = (transactions: Transaction[]) => {
  // Gelir Toplamı
  const incomeData = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  // Gider Toplamı
  const expenseData = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  // Kategoriye Göre Dağılım
  const categoryData = transactions.reduce((acc: Record<string, number>, curr) => {
    const category = curr.category || "Unknown";
    acc[category] = (acc[category] || 0) + curr.amount;
    return acc;
  }, {});

  return { incomeData, expenseData, categoryData };
};
