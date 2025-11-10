"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { LoginPage } from "@/components/LoginPage";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    // Exemplo: redirecionar após login
    router.push("/dashboard");
  };

  return (
    <main className="flex items-center justify-center min-h-screen p-4 bg-gray-50 relative">
      <div className="absolute top-6 left-6">
        <Image src="/logo.png" alt="Logo" width={120} height={40} priority />
      </div>

      <LoginPage onLogin={handleLogin} />
    </main>
  );
}
