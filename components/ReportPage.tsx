'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Label } from './ui/label';
import {
  ArrowLeft,
  Download,
  FileText,
  Shield,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
} from 'lucide-react';

import logoImage from '@/public/logo.png'; // ✅ Import correto do Next.js

interface ReportPageProps {
  onNavigate: (page: string) => void;
}

export function ReportPage({ onNavigate }: ReportPageProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const reportData = {
    company: 'Empresa Exemplo S.A.',
    assessmentDate: '15 de Dezembro de 2024',
    consultant: 'João Silva - BlackBelt IT Solutions',
    overallScore: 65,
    maturityLevel: 'Definido',
    maturityByGroup: [
      { subject: 'IG1 - Básico', A: 85 },
      { subject: 'IG2 - Fundacional', A: 65 },
      { subject: 'IG3 - Organizacional', A: 35 },
    ],
    controlsSummary: [
      { name: 'Implementados', value: 12, color: '#28a745' },
      { name: 'Parciais', value: 8, color: '#ffc107' },
      { name: 'Não Implementados', value: 5, color: '#D62828' },
    ],
  };

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert('Relatório PDF gerado e baixado com sucesso!');
    }, 2000);
  };

  const ReportPreview = () => (
    <div className="bg-white shadow-lg max-w-4xl mx-auto">
      <div className="border-b border-gray-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <Image
            src={logoImage}
            alt="BlackBelt IT Solutions"
            width={140}
            height={40}
            className="h-12 w-auto"
          />
          <div className="text-right">
            <p className="text-sm text-gray-600">Data do Relatório</p>
            <p className="font-semibold">{reportData.assessmentDate}</p>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Relatório de Análise de Maturidade
          </h1>
          <h2 className="text-xl font-semibold text-red-600 mb-4">
            CIS Controls Framework
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-lg">
              <strong>Organização:</strong> {reportData.company}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Consultor: {reportData.consultant}
            </p>
          </div>
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-red-600" />
          Resumo Executivo
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {reportData.overallScore}%
            </div>
            <p className="text-sm text-gray-600">Maturidade Geral</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {reportData.controlsSummary[0].value}
            </div>
            <p className="text-sm text-gray-600">Controles Implementados</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {reportData.controlsSummary[2].value}
            </div>
            <p className="text-sm text-gray-600">Pontos Críticos</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={logoImage}
              alt="BlackBelt IT Solutions"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
            <Button variant="ghost" onClick={() => onNavigate('dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div className="border-l border-gray-300 pl-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Geração de Relatório
              </h1>
              <p className="text-gray-600">
                Relatório de Análise de Maturidade CIS Controls
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {showPreview ? 'Ocultar' : 'Pré-visualizar'}
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={handleGeneratePDF}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Gerando...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Gerar PDF
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {showPreview ? (
          <ReportPreview />
        ) : (
          <div className="text-center mt-10 text-gray-600">
            Clique em “Pré-visualizar” para ver o relatório.
          </div>
        )}
      </div>
    </div>
  );
}
