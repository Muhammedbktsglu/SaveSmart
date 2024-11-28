"use client";

import { Transaction } from "../types/Transaction";

interface TransactionsListProps {
  transactions: Transaction[];
}

export default function TransactionsList({ transactions }: TransactionsListProps) {
  return (
    <div className="transaction-grid">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className={`card ${
            transaction.type === "income" ? "card-income" : "card-expense"
          }`}
        >
          <div className="card-header">
            <span className="card-title">{transaction.description}</span>
            <span className="card-amount">{transaction.amount}₺</span>
          </div>
          <div className="card-body">
            <p>{transaction.date}</p>
            <p>{transaction.category || "Uncategorized"}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
