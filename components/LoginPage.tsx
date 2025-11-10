"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { Shield, Lock, Eye, EyeOff } from "lucide-react";
import logoImage from "@/public/logo.png";

// ✅ Interface das props do componente
interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Lógica de login simulada
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!show2FA && email && password) {
      setIsLoading(true);
      setTimeout(() => {
        setShow2FA(true);
        setIsLoading(false);
      }, 1000);
    } else if (show2FA && otpValue.length === 6) {
      setIsLoading(true);
      setTimeout(() => {
        onLogin();
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative">
      {/* ✅ Logo */}
      <div className="absolute top-6 left-6 z-10">
        <img src={logoImage.src} alt="BlackBelt IT Solutions" className="h-8 w-auto" />
      </div>

      {/* ✅ Conteúdo Central */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Análise de Maturidade CIS Control
            </h1>
            <p className="text-gray-600">Acesso seguro ao sistema</p>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl text-center flex items-center justify-center gap-2">
                <Shield className="w-5 h-5 text-red-600" />
                {show2FA ? "Autenticação 2FA" : "Login Seguro"}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Login Normal */}
                {!show2FA ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail / Usuário</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-gray-50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Senha</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Digite sua senha"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="bg-gray-50 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <button
                        type="button"
                        className="text-sm text-red-600 hover:text-red-700 hover:underline"
                      >
                        Esqueci minha senha
                      </button>
                    </div>
                  </>
                ) : (
                  // ✅ Autenticação 2FA
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="bg-red-50 p-3 rounded-lg mb-4">
                        <Lock className="w-6 h-6 text-red-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-700">
                          Código de verificação enviado para<br />
                          <strong>{email}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="otp">Código de Verificação</Label>
                      <div className="flex justify-center">
                        <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
                          <InputOTPGroup>
                            {[0, 1, 2, 3, 4, 5].map((i) => (
                              <InputOTPSlot key={i} index={i} />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </div>

                    <div className="text-center">
                      <button
                        type="button"
                        className="text-sm text-gray-600 hover:text-gray-800 hover:underline"
                      >
                        Reenviar código
                      </button>
                    </div>
                  </div>
                )}

                <Separator className="my-4" />

                {/* ✅ Botão principal */}
                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  disabled={
                    isLoading ||
                    (!show2FA && (!email || !password)) ||
                    (show2FA && otpValue.length !== 6)
                  }
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Verificando...
                    </div>
                  ) : show2FA ? (
                    "Confirmar Código"
                  ) : (
                    "Fazer Login"
                  )}
                </Button>

                {/* ✅ Botão de voltar no 2FA */}
                {show2FA && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setShow2FA(false)}
                  >
                    Voltar
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>

          <div className="text-center mt-6 text-xs text-gray-500">
            © 2024 BlackBelt IT Solutions. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </div>
  );
}
