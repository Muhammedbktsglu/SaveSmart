"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useUser } from "../../context/UserContext";
import { getTransactions } from "../../utils/LocalStorageUtils";
import { Transaction } from "../../types/Transaction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/transactions.css";

export default function TransactionsPage() {
  const { t } = useLanguage();
  const { currentUser } = useUser();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    const storedTransactions = getTransactions();
    setTransactions(storedTransactions);
  }, []);

  // Filtrelenmiş işlemleri hesapla
  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    const matchesType = filter === "all" || transaction.type === filter;
    const matchesDate =
      (!startDate || transactionDate >= startDate) &&
      (!endDate || transactionDate <= endDate);
    return matchesType && matchesDate;
  });

  return (
    <div className="transactions-page">
      {/* Sayfa Başlığı */}
      <h2 className="page-title">{t("transactions.title")}</h2>

      {/* Filtreleme Butonları */}
      <div className="filter-buttons">
        {["all", "income", "expense"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`filter-button ${filter === type ? "filter-button-active" : ""}`}
          >
            {t(`transactions.${type}`)}
          </button>
        ))}
      </div>

      {/* Tarih Aralığı Seçimi */}
      <div className="date-picker-container">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText={t("transactions.startDate")}
          className="date-picker"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText={t("transactions.endDate")}
          className="date-picker"
        />
      </div>

      {/* Transaction Tablosu */}
      <table className="transaction-table">
        <thead>
          <tr>
            <th>{t("transactions.nameBusiness")}</th>
            <th>{t("transactions.date")}</th>
            <th>{t("transactions.category")}</th>
            <th>{t("transactions.amount")}</th>
            <th>{t("transactions.status")}</th>
            <th>{t("transactions.action")}</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction, index) => (
              <tr key={index} className="transaction-row">
                <td>
                  <div className="user-cell">
                    <img
                      src={transaction.user?.profilePicture || "/avatars/default-avatar.png"}
                      alt={transaction.user?.username || "Unknown"}
                      className="user-avatar"
                    />
                    <span>{transaction.user?.username || "Unknown"}</span>
                  </div>
                </td>
                <td>{transaction.date}</td>
                <td>{transaction.category || t("transactions.unknownCategory")}</td>
                <td
                  className={
                    transaction.type === "income" ? "amount-income" : "amount-expense"
                  }
                >
                  {transaction.amount}₺
                </td>
                <td>{transaction.type === "income" ? t("transactions.income") : t("transactions.expense")}</td>
                <td>
                  <div className="details-container">
                    <button className="details-button">{t("transactions.details")}</button>
                    <div className="details-tooltip">
                      <p>{transaction.description}</p>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="no-data-message">
                {t("transactions.noData")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
