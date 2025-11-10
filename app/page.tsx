"use client";

import Image from "next/image";
import { LoginPage } from "../components/LoginPage";


export default function Home() {
  const handleLogin = () => {
    console.log("Usuário autenticado!");
    // Aqui você pode redirecionar o usuário após o login
    // Exemplo: router.push("/dashboard");
  };

  return (
    <main className="flex items-center justify-center min-h-screen p-4 bg-gray-50 relative">
      {/* Logo no canto superior esquerdo */}
      <div className="absolute top-6 left-6">
        <Image
          src="/logo.png"
          alt="Logo da empresa"
          width={120}
          height={40}
          priority
        />
      </div>

      {/* Tela de Login */}
      <LoginPage onLogin={handleLogin} />
    </main>
  );
}
