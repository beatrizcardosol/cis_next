"use client";

import { useRouter } from "next/navigation";
import { LoginPage } from "@/components/LoginPage";

export default function Login() {
  const router = useRouter();

  // ✅ Função executada quando o login for bem-sucedido
  const handleLogin = () => {
    router.push("/dashboard"); // ou qualquer rota desejada
  };

  return <LoginPage onLogin={handleLogin} />;
}
