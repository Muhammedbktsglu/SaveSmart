import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-400 py-6">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Save Smart - {t("footer.rights")}</p>
        <p>
          {t("footer.projectFor")}{" "}
          <a
            href="https://www.linkedin.com/company/2ntechnology/"
            target="_blank"
            className="text-blue-400 hover:underline"
          >
            2N Technology
          </a>.
        </p>
        <p>
          {t("footer.developer")}:{" "}
          <a
            href="https://www.linkedin.com/in/muhammedbktsglu/"
            target="_blank"
            className="text-blue-400 hover:underline"
          >
            Muhammed Bektasoglu
          </a>
        </p>
      </div>
    </footer>
  );
}
