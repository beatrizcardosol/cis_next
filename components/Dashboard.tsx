"use client";

import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { BarChart3, ClipboardList, LogOut } from "lucide-react";

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Painel de Controle - CIS Control
          </h1>
          <Button
            variant="outline"
            onClick={() => onNavigate("logout")}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Sair
          </Button>
        </div>

        <Separator className="my-6" />

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                <ClipboardList className="w-5 h-5 text-red-600" />
                Questionário de Maturidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Avalie o nível de maturidade dos controles de segurança da sua
                organização com base nos padrões CIS Controls.
              </p>
              <Button
                onClick={() => onNavigate("questionnaire")}
                className="bg-red-600 hover:bg-red-700"
              >
                Iniciar Avaliação
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                <BarChart3 className="w-5 h-5 text-red-600" />
                Relatórios e Resultados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Visualize relatórios de desempenho e análises de conformidade
                geradas automaticamente.
              </p>
              <Button
                onClick={() => onNavigate("report")}
                className="bg-red-600 hover:bg-red-700"
              >
                Ver Relatórios
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
