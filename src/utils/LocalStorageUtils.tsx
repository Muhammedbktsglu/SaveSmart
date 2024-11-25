import { Transaction } from "../types/Transaction";

export const getTransactions = (): Transaction[] => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("transactions");
    return data ? JSON.parse(data) : [];
  }
  return [];
};

export const saveTransaction = (transaction: Omit<Transaction, "id">): void => {
  if (typeof window !== "undefined") {
    const currentData = getTransactions();
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      user: transaction.user,
    };
    const updatedData = [...currentData, newTransaction];
    localStorage.setItem("transactions", JSON.stringify(updatedData));
  }
};
