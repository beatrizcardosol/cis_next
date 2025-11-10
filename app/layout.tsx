import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BlackBelt IT Solutions - Login",
  description: "Análise de Maturidade CIS Control",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-gray-50">
        {children}
      </body>
    </html>
  );
}
