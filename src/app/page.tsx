"use client";

import { useState, useEffect } from "react";
import IncomeExpenseForm from "../components/incomeExpenseForm";
import TransactionsList from "../components/TransactionsList";
import { getTransactions, saveTransaction } from "../utils/LocalStorageUtils";
import { Transaction } from "../types/Transaction";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { t } = useLanguage(); // Dil desteği için t fonksiyonunu kullanıyoruz.

  // İlk yüklemede verileri Local Storage'dan al
  useEffect(() => {
    const storedTransactions = getTransactions();
    setTransactions(storedTransactions);
  }, []);

  const handleFormSubmit = (formData: Transaction) => {
    const newTransaction = {
      ...formData,
      id: `${Date.now()}`,
    };
  
    saveTransaction(newTransaction);
    setTransactions((prev) => [...prev, newTransaction]);
  };

  return (
    <>
      <main className="container mx-auto my-8">
        {/* Başlık */}
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-100">
          {t("form.addIncomeExpense")}
        </h2>

        {/* Gelir/Gider Formu */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <IncomeExpenseForm onSubmit={handleFormSubmit} />
        </div>

        {/* İşlem Listesi */}
        <h3 className="text-lg font-semibold mt-8 text-gray-100 text-center">
          {t("transactions.title")}
        </h3>
        {transactions.length > 0 ? (
          <TransactionsList transactions={transactions} />
        ) : (
          <p className="text-center text-gray-400 mt-4">{t("transactions.noData")}</p>
        )}
      </main>
    </>
  );
}
