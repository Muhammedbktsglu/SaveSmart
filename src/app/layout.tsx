"use client";

import "./styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LanguageProvider } from "../context/LanguageContext";
import { UserProvider } from "../context/UserContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-100">
        <LanguageProvider>
          <UserProvider>
            <Header />
            <main className="container mx-auto py-8 mt-20">{children}</main>
            <Footer />
          </UserProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
