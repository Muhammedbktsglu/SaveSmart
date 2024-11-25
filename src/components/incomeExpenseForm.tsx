import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useUser } from "../context/UserContext";

export default function IncomeExpenseForm({ onSubmit }: { onSubmit: (formData: any) => void }) {
  const { t } = useLanguage();
  const { currentUser } = useUser();

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    date: "",
    type: "income",
    category: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Hata mesajını yönetmek için state

  const categories = {
    income: [
      { key: "salary", label: t("form.categoryOptions.salary") },
      { key: "investment", label: t("form.categoryOptions.investment") },
      { key: "gift", label: t("form.categoryOptions.gift") },
    ],
    expense: [
      { key: "food", label: t("form.categoryOptions.food") },
      { key: "rent", label: t("form.categoryOptions.rent") },
      { key: "utilities", label: t("form.categoryOptions.utilities") },
    ],
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.date) {
      setErrorMessage(t("form.dateTitle"));
      return;
    }

    const selectedDate = new Date(formData.date);
    const selectedYear = selectedDate.getFullYear();

    if (selectedYear < 1900 || selectedYear > 2100) {
      setErrorMessage(t("form.invalidYear"));
      return;
    }

    const newTransaction = {
      ...formData,
      id: `${Date.now()}`,
      user: currentUser,
    };

    onSubmit(newTransaction);
    setFormData({ description: "", amount: "", date: "", type: "income", category: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-md space-y-4"
    >
      {/* Başlık */}
      <h3 className="text-xl font-semibold text-center text-gray-100">
        {t("form.addIncomeExpense")}
      </h3>

      {/* Açıklama Girişi */}
      <input
        type="text"
        name="description"
        placeholder={t("form.description")}
        maxLength={24}
        value={formData.description}
        onChange={handleChange}
        className="border border-gray-600 bg-gray-700 text-gray-100 w-full p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
      />

      {/* Tutar Girişi */}
      <input
        type="number"
        name="amount"
        placeholder={t("form.amount")}
        value={formData.amount}
        onChange={handleChange}
        className="border border-gray-600 bg-gray-700 text-gray-100 w-full p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
        min="0"
        step="0.01" // Virgülden sonra iki basamak için
      />

      {/* Tarih Girişi */}
      <div className="relative">
        <input
          type="date" // Date picker
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={`border border-gray-600 bg-gray-700 text-gray-100 w-full p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
            errorMessage ? "border-red-500" : ""
          }`}
          required
        />
        {errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p> // Hata mesajını göster
        )}
      </div>

      {/* Gelir/Gider Seçimi */}
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="border border-gray-600 bg-gray-700 text-gray-100 w-full p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="income">{t("form.income")}</option>
        <option value="expense">{t("form.expense")}</option>
      </select>

      {/* Kategori Seçimi */}
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="border border-gray-600 bg-gray-700 text-gray-100 w-full p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
      >
        <option value="" disabled>
          {t("form.selectCategory")}
        </option>
        {(formData.type === "income" ? categories.income : categories.expense).map((category) => (
          <option key={category.key} value={category.key}>
            {category.label}
          </option>
        ))}
      </select>

      {/* Gönder Butonu */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      >
        {t("form.submit")}
      </button>
    </form>
  );
}