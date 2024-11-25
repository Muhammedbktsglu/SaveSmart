import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { useUser } from "../context/UserContext";

export default function Header() {
  const { t, setLanguage, language } = useLanguage();
  const { currentUser, switchUser } = useUser();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold">Save Smart</h1>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          {[
            { href: "/", label: t("header.home") },
            { href: "/transactions", label: t("header.transactions") },
            { href: "/reports", label: t("header.reports") },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-gray-300 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Language and User Dropdowns */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="relative group">
            <button className="bg-gray-800 text-white py-2 px-4 rounded-lg">
              {language.toUpperCase()} 🌍
            </button>
            <div className="absolute right-0 mt-2 w-28 bg-white text-gray-800 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition duration-200">
              <button
                onClick={() => setLanguage("tr")}
                className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
              >
                Türkçe
              </button>
              <button
                onClick={() => setLanguage("en")}
                className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
              >
                English
              </button>
            </div>
          </div>

          {/* User Selector */}
          <div className="relative group">
            <button className="bg-gray-800 text-white py-2 px-4 rounded-lg flex items-center space-x-2">
              <img
                src={currentUser.profilePicture || "/default-avatar.png"}
                alt="User Avatar"
                className="w-6 h-6 rounded-full"
              />
              <span>{currentUser.username}</span>
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition duration-200">
              {(["moderator", "admin", "user"] as Array<"admin" | "moderator" | "user">).map((role) => (
                <button
                  key={role}
                  onClick={() => switchUser(role)}
                  className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
