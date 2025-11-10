import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "CIS - Converted Next.js App",
  description: "Project converted to Next.js app router",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <header className="border-b p-4 flex items-center justify-between">
          <div className="text-lg font-bold">CIS</div>
          <nav className="space-x-4">
            <Link href="/login">Login</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/questionnaire">Questionnaire</Link>
            <Link href="/report">Report</Link>
          </nav>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}