"use client";

import { useRouter } from "next/navigation";
import { Dashboard } from "@/components/Dashboard";

export default function DashboardPage() {
  const router = useRouter();

  // ✅ Define as navegações do Dashboard
  const handleNavigate = (page: string) => {
    if (page === "logout") {
      router.push("/login");
    } else {
      router.push(`/${page}`);
    }
  };

  return <Dashboard onNavigate={handleNavigate} />;
}
